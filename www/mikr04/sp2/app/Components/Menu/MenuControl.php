<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 28.12.2019
 * Time: 19:56
 */

declare(strict_types=1);

namespace App\Components;

use Nette\Application\UI;

class MenuControl extends UI\Control
{
    public function render() {
        $template = $this->template;
        $template->render(__DIR__ . '/Menu.latte');
    }
}