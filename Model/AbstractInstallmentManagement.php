<?php

namespace MundiPagg\MundiPagg\Model;

use Mundipagg\Core\Kernel\Aggregates\Order;
use Mundipagg\Core\Kernel\Services\InstallmentService;
use Mundipagg\Core\Kernel\ValueObjects\CardBrand;
use MundiPagg\MundiPagg\Concrete\Magento2CoreSetup;

abstract class AbstractInstallmentManagement
{
    public function __construct()
    {
        Magento2CoreSetup::bootstrap();
    }

    protected function getCoreInstallments(
        Order $order = null,
        CardBrand $brand = null,
        $value = null
    ){


        $installmentService = new InstallmentService();

        $installments = $installmentService->getInstallmentsFor(
            $order,
            $brand,
            $value
        );

        $result = [];
        foreach ($installments as $installment)
        {
            $result[] = [
                'id' => $installment->getTimes(),
                'interest' =>
                    ($installment->getTotal() - $installment->getBaseTotal()) / 100,
                'label' => $installmentService->getLabelFor($installment)
            ];
        }

        return $result;
    }
}
