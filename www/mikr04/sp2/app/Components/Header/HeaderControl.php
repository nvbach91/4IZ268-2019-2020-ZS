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


class HeaderControl extends UI\Control
{
    public function render() {

        $this->template->render(__DIR__ . '/Header.latte');
    }
}