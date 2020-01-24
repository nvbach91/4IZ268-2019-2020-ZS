<?php

declare(strict_types=1);

namespace App\Router;

use Nette;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
    use Nette\StaticClass;

    public static function createRouter(): RouteList
    {
        $router = new RouteList();

        $router->addRoute('sign/<action>', array(
            'presenter' => 'Sign',
            'action' => 'in'
        ), $router::ONE_WAY);

        $router->addRoute('<module>/<presenter>/<action>[/<id>]', array(
            'presenter' => 'Dashboard',
            'action' => 'default',
        ));


        $router->addRoute('<presenter>/<action>[/<id>]', array(
            'presenter' => 'Home',
            'action' => 'default',
        ));
        return $router;
    }
}
