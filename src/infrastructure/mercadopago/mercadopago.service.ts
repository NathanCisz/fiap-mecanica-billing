import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Payment as MPPayment } from 'mercadopago';

export interface CreatePaymentData {
  amount: number;
  description: string;
  paymentMethod: string;
  email: string;
}

export interface MercadoPagoPaymentResult {
  id: string;
  status: string;
  statusDetail: string;
}

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name);
  private readonly client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    });
  }

  async createPayment(
    data: CreatePaymentData,
  ): Promise<MercadoPagoPaymentResult> {
    try {
      const payment = new MPPayment(this.client);
      const result = await payment.create({
        body: {
          transaction_amount: data.amount,
          description: data.description,
          payment_method_id: data.paymentMethod,
          payer: {
            email: data.email,
          },
        },
      });

      this.logger.log(`Payment created: ${result.id}`);

      return {
        id: String(result.id),
        status: result.status || 'pending',
        statusDetail: result.status_detail || '',
      };
    } catch (error) {
      this.logger.error('MercadoPago payment failed', error);
      throw new Error(`Payment failed: ${(error as Error).message}`);
    }
  }
}
