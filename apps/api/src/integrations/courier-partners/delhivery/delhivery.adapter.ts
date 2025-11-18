import { AppError } from '@/common/errors'
import {
  CreateShipmentInput,
  CreateShipmentOutput,
  GetQuoteInput,
  ICourierProvider,
  QuoteOutput,
  SchedulePickupInput,
  SchedulePickupOutput,
  ServiceabilityOutput,
  TrackingOutput,
} from '../courier.interface'

export class DelhiveryAdapter implements ICourierProvider {
  name = 'Delhivery'

  async createShipment(data: CreateShipmentInput): Promise<CreateShipmentOutput> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }

  async trackShipment(trackingNumber: string): Promise<TrackingOutput> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }

  async schedulePickup(data: SchedulePickupInput): Promise<SchedulePickupOutput> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }

  async cancelPickup(pickupId: string): Promise<boolean> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }

  async getQuote(data: GetQuoteInput): Promise<QuoteOutput> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }

  async checkServiceability(pincode: string): Promise<ServiceabilityOutput> {
    throw new AppError('Delhivery integration not yet implemented', 501)
  }
}
