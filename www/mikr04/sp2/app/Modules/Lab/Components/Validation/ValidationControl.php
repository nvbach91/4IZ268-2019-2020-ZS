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

class ValidationControl extends UI\Control
{
    public function render($size = 6) {
        $template = $this->template;
        $template->size = $size;
        $template->render(__DIR__ . '/Validation.latte');
    }
}