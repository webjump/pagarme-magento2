<?php

namespace Pagarme\Pagarme\Model\Api;

use Magento\Framework\Webapi\Rest\Request;
use Magento\Framework\App\ObjectManager;
use \Magento\Framework\App\Config\Storage\WriterInterface;
use \Magento\Framework\App\Cache\Manager;
use Pagarme\Pagarme\Api\HubCommandInterface;
use Pagarme\Pagarme\Concrete\Magento2CoreSetup;

use Pagarme\Core\Hub\Services\HubIntegrationService;

class HubCommand implements HubCommandInterface
{
    /**
     * @var Request
     */
    protected $request;


    /**
     * @var WriterInterface
     */
    protected $configWriter;

    /**
     * @var Manager
     */
    protected $cacheManager;

    public function __construct(Request $request)
    {
        $this->request = $request;

        $objectManager = ObjectManager::getInstance();
        $this->configWriter = $objectManager->get(WriterInterface::class);
        $this->cacheManager = $objectManager->get(Manager::class);

        Magento2CoreSetup::bootstrap();
    }

    public function execute()
    {
        $params = json_decode(
            json_encode($this->request->getBodyParams())
        );

        $hubCommandFactory = new HubIntegrationService();
        $hubCommandFactory->executeCommandFromPost($params);

        $command = strtolower($params->command) . 'Command';
        $commandResponse = $this->$command();

        return $commandResponse;
    }

    public function uninstallCommand()
    {

        $this->configWriter->save(
            "pagarme_pagarme/hub/install_id",
            null
        );

        $this->configWriter->save(
            "pagarme_pagarme/hub/access_token",
            null
        );

        $this->configWriter->save(
            "pagarme_pagarme/global/secret_key",
            null
        );

        $this->configWriter->save(
            "pagarme_pagarme/global/public_key",
            null
        );

        $this->cacheManager->clean(['config']);

        return [
            'code' => 200,
            'message' => "Hub uninstalled successfully"
        ];
    }
}
