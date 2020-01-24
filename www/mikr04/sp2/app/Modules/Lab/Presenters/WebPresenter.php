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
use App\Modules\Lab\Components as C;

final class WebPresenter extends \App\Presenters\BasePresenter
{
    private $labManager;
    private $httpRequest;

    public function __construct(Model\LabManager $labManager, \Nette\Http\Request $httpRequest)
    {
        $this->labManager = $labManager;
        $this->httpRequest = $httpRequest;
    }

    public function startup()
    {
        parent::startup();
        $this->template->title = "Webová laboratoř";
    }

    public function actionDefault() {
        $this->forward("Web:list"); // TODO - Nejspíš nějaký webový dashboard.
    }

    public function actionList() {
        $order = $this->httpRequest->getQuery('order');
        if ($this->httpRequest->isAjax()) {
            $webs = $this->labManager->getAllWebs($order);
            $this->sendResponse(new \Nette\Application\Responses\JsonResponse($webs));
        }
    }

    public function renderList() {
        $this->template->webs = $this->labManager->getAllWebs();
    }

    public function actionView($id) {
        if ($this->httpRequest->getQuery('remove')) {
            $this->labManager->removeWeb($id);
            $this->redirect("Web:list");
        }
        else if ($this->httpRequest->isAjax()) {
            $score = $this->httpRequest->getPost('score');
            $this->labManager->newTest($id, $score);
            /*
            try {
                $this->user->login($email, $pass);
                $this->sendResponse(new \Nette\Application\Responses\JsonResponse(1));
            } catch (\Nette\Security\AuthenticationException $e) {
                $this->sendResponse(new \Nette\Application\Responses\JsonResponse(0));
            }
            */
        }
    }

    public function renderView($id) {
        if (!$id) {
            $this->redirect("Web:list");
        }
        $this->template->web = $this->labManager->getWeb($id);
        $this->template->domain = $id;
        if (!$this->template->web) {
            // TODO - Nový web
        }
    }

    protected function createComponentValidation(): C\ValidationControl
    {
        $widget = new C\ValidationControl();
        $widget->redrawControl();
        return $widget;
    }

    protected function createComponentSpeed(): C\SpeedControl
    {
        $widget = new C\SpeedControl();
        $widget->redrawControl();
        return $widget;
    }

}