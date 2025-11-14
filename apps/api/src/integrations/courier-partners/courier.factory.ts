import { AppError } from '@/common/errors'
import { BlueDartAdapter } from './bluedart/bluedart.adapter'
import { ICourierProvider } from './courier.interface'
import { DelhiveryAdapter } from './delhivery/delhivery.adapter'

export type CourierProviderName = 'bluedart' | 'delhivery'

export class CourierFactory {
  private static providers: Map<CourierProviderName, ICourierProvider> = new Map([
    ['bluedart', new BlueDartAdapter()],
    ['delhivery', new DelhiveryAdapter()],
  ])

  /**
   * Get courier provider instance
   */
  static getProvider(name: CourierProviderName): ICourierProvider {
    const provider = this.providers.get(name)

    if (!provider) {
      throw new AppError(`Courier provider '${name}' not found`, 400)
    }

    return provider
  }

  /**
   * Get all available providers
   */
  static getAllProviders(): ICourierProvider[] {
    return Array.from(this.providers.values())
  }

  /**
   * Get best quote from all providers
   */
  static async getBestQuote(data: any) {
    const providers = this.getAllProviders()
    const quotes = await Promise.allSettled(providers.map((provider) => provider.getQuote(data)))

    const successfulQuotes = quotes
      .filter((result) => result.status === 'fulfilled')
      .map((result: any) => result.value)
      .filter((quote) => quote.serviceable)

    if (successfulQuotes.length === 0) {
      throw new AppError('No courier service available for this route', 400)
    }

    // Sort by total charge
    return successfulQuotes.sort((a, b) => a.charges.total - b.charges.total)
  }
}
