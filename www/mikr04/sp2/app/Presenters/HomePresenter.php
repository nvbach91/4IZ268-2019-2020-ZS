<?php

declare(strict_types=1);

namespace App\Presenters;

use App\Model;
use Nette;

final class HomePresenter extends \App\Presenters\BasePresenter
{
    public function renderDefault() {
        $this->template->title = "Dashboard";
    }
}
