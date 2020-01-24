<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 28.12.2019
 * Time: 19:56
 */

declare(strict_types=1);

namespace App\Modules\Lab\Components;

use Nette\Application\UI;

class SpeedControl extends UI\Control
{
    public function render($device = 'desktop', $size = 6) {
        $template = $this->template;
        $template->size = $size;
        $this->template->device = $device;
        $template->render(__DIR__ . '/Speed.latte');
    }
}