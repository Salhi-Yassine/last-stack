<?php

namespace App\Controller;

use App\Repository\PlanetRepository;
use App\Repository\VoyageRepository;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Doctrine\ORM\QueryAdapter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function homepage(
        VoyageRepository $voyageRepository,
        PlanetRepository $planetRepository,
        #[MapQueryParameter()] int $page = 1,
        #[MapQueryParameter()] string $sort = 'leaveAt',
        #[MapQueryParameter()] string $sortDirection = 'ASC',
        #[MapQueryParameter('query')] string $query = null,
        #[MapQueryParameter('planets', \FILTER_VALIDATE_INT)] array $searchPlanets = [],
    ): Response
    {
        $validSorts = ['leaveAt', 'purpose'];
        $sort = in_array($sort, $validSorts) ? $sort : 'leaveAt';

        $pager = PagerFanta::createForCurrentPageWithMaxPerPage(
            new QueryAdapter($voyageRepository->findBySearchQueryBuilder($query, $searchPlanets, $sort, $sortDirection)),
            $page,
            10
        );

        return $this->render('main/homepage.html.twig', [
            'voyages' => $pager,
            'planets' => $planetRepository->findAll(),
            'searchPlanets' => $searchPlanets,
            'sort' => $sort,
            'sortDirection' => $sortDirection,
        ]);
    }
}
