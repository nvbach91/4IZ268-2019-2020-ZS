<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 28.12.2019
 * Time: 18:12
 */

declare(strict_types=1);

namespace App\Modules\Lab\Presenters;

use App\Modules\Lab\Model;
use App\Model as Mod;

final class DashboardPresenter extends \App\Presenters\BasePresenter
{
    private $labManager;
    private $userManager;

    public function __construct(Model\LabManager $labManager, Mod\UserManager $userManager)
    {
        $this->labManager = $labManager;
        $this->userManager = $userManager;
    }

    public function startup()
    {
        parent::startup();
    }

    public function renderDefault() {
        $this->template->title = "Lab Dashboard";
        $this->template->webs = $this->labManager->getAllWebs();
    }

}