-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "USER_VERIFICATION_STATUS" AS ENUM ('DEFAULT', 'APPROVED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('BUYER', 'SELLER', 'MERCHANT', 'ADMIN', 'GUEST');

-- CreateEnum
CREATE TYPE "ADMIN_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "MERCHANT_MODE" AS ENUM ('TEST', 'LIVE');

-- CreateEnum
CREATE TYPE "STORE_TYPE" AS ENUM ('SHOPIFY', 'WOOCOMMERCE');

-- CreateEnum
CREATE TYPE "STORE_CONNECTION_TYPE" AS ENUM ('OAUTH', 'MANUAL');

-- CreateEnum
CREATE TYPE "STORE_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "ONBOARDING_STATUS" AS ENUM ('PENDING', 'SKIPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "API_STATUS" AS ENUM ('ENABLED', 'DISABLED', 'REVOKED');

-- CreateEnum
CREATE TYPE "PLAN_TYPE" AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SUBSCRIPTION_STATUS" AS ENUM ('ACTIVE', 'TRIAL', 'CANCELLED', 'PAST_DUE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ACCOUNT_STATUS" AS ENUM ('ACTIVE', 'SUSPENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PAYOUT_STATUS" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PAYOUT_METHOD" AS ENUM ('UPI', 'BANK_TRANSFER', 'RAZORPAY');

-- CreateEnum
CREATE TYPE "PAYOUT_FREQUENCY" AS ENUM ('MANUAL', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "DEDUCTION_TYPE" AS ENUM ('SHIPPING', 'REVERSE_DELIVERY', 'COD_CHARGE', 'PENALTY', 'PLATFORM_FEE', 'DISPUTE_RESOLUTION', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "DEDUCTION_STATUS" AS ENUM ('PENDING', 'SETTLED', 'WAIVED');

-- CreateEnum
CREATE TYPE "DEDUCTION_SOURCE" AS ENUM ('SYSTEM', 'ADMIN', 'MERCHANT');

-- CreateEnum
CREATE TYPE "LISTING_TYPE" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "LISTING_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CONNECT_STATUS" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ORDER_TYPE" AS ENUM ('CUSTOM', 'PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "ORDER_FLOW_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PLATFORM_FEE_PAYER" AS ENUM ('BUYER', 'SELLER', 'BOTH');

-- CreateEnum
CREATE TYPE "CHARGE_PAYER" AS ENUM ('BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "MARKETPLACE_ORDER_STATUS" AS ENUM ('PENDING', 'CREATED', 'PAID', 'ON_HOLD', 'FINISHED', 'ON_DISPUTE', 'RELEASED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SHOP_ORDER_SOURCE" AS ENUM ('SHOPIFY', 'RAKSHASETU', 'WOOCOMMERCE');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('CREATED', 'PAYMENT_PENDING', 'PAYMENT_RECEIVED', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURN_REQUESTED', 'RETURN_IN_TRANSIT', 'RETURNED', 'CANCELLED', 'FAILED_DELIVERY', 'DISPUTE_OPEN', 'DISPUTE_RESOLVED', 'REFUND_INITIATED', 'REFUND_COMPLETED');

-- CreateEnum
CREATE TYPE "FULFILLMENT_STATUS" AS ENUM ('UNFULFILLED', 'PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ORDER_GROUP_SOURCE" AS ENUM ('RAKSHASETU', 'SHOPIFY', 'WOOCOMMERCE', 'MANUAL');

-- CreateEnum
CREATE TYPE "ORDER_GROUP_STATUS" AS ENUM ('PENDING', 'PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "ORDER_GROUP_TYPE" AS ENUM ('MARKETPLACE', 'SINGLE_STORE', 'BULK_IMPORT');

-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('PREPAID', 'POD', 'COD');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'COD_PENDING', 'COD_COLLECTED', 'COD_FAILED');

-- CreateEnum
CREATE TYPE "PAYMENT_ORDER_SOURCE" AS ENUM ('CHECKOUT', 'API', 'MARKETPLACE', 'SHOP');

-- CreateEnum
CREATE TYPE "TRANSACTION_STATUS" AS ENUM ('INITIATED', 'ON_HOLD', 'AWAITING_RELEASE', 'RELEASED_TO_SELLER', 'REFUND_PENDING', 'REFUNDED_TO_BUYER', 'DISPUTED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "ESCROW_STATUS" AS ENUM ('INITIATED', 'HELD', 'RELEASE_REQUESTED', 'RELEASED', 'DISPUTE_OPEN', 'DISPUTE_RESOLVED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SHOP_PLATFORM_FEE_PAYER" AS ENUM ('MERCHANT', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "AUTH_TYPE" AS ENUM ('API_KEY', 'OAUTH', 'BASIC', 'JWT');

-- CreateEnum
CREATE TYPE "DELIVERY_TYPE" AS ENUM ('STANDARD', 'EXPRESS', 'SAME_DAY', 'NEXT_DAY', 'SCHEDULED', 'HYPERLOCAL', 'INTERNATIONAL', 'REVERSE');

-- CreateEnum
CREATE TYPE "TRANSPORT_MODE" AS ENUM ('AIR', 'SURFACE', 'HYPERLOCAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "SHIPPING_SOURCE" AS ENUM ('ORDER', 'LOGISTICS');

-- CreateEnum
CREATE TYPE "DELIVERY_STATUS" AS ENUM ('PENDING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED', 'FAILED');

-- CreateEnum
CREATE TYPE "LOGISTICS_STATUS" AS ENUM ('CREATED', 'QUOTE_SELECTED', 'SHIPMENT_REGISTERED', 'LABEL_GENERATED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'HUB_TRANSFER', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELIVERY_FAILED', 'RETURN_REQUESTED', 'RETURN_IN_TRANSIT', 'RETURNED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DOCUMENT_TYPE" AS ENUM ('LABEL', 'INVOICE', 'PICKLIST', 'MANIFEST', 'POD', 'PACKING_SLIP', 'RETURN_LABEL');

-- CreateEnum
CREATE TYPE "BULK_JOB_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIALLY_COMPLETED');

-- CreateEnum
CREATE TYPE "MANIFEST_STATUS" AS ENUM ('DRAFT', 'GENERATED', 'HANDED_OVER', 'CLOSED');

-- CreateEnum
CREATE TYPE "NDR_STATUS" AS ENUM ('REPORTED', 'CUSTOMER_CONTACTED', 'REATTEMPT_SCHEDULED', 'RESOLVED', 'RTO_INITIATED');

-- CreateEnum
CREATE TYPE "RETURN_REASON" AS ENUM ('DAMAGED', 'WRONG_ITEM', 'NO_LONGER_NEEDED', 'OTHER');

-- CreateEnum
CREATE TYPE "RETURN_STATUS" AS ENUM ('REQUESTED', 'APPROVED', 'PICKED_UP', 'REFUNDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DISPUTE_ROLE" AS ENUM ('BUYER', 'SELLER');

-- CreateEnum
CREATE TYPE "DISPUTE_STATUS" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "REFUND_METHOD" AS ENUM ('RAZORPAY', 'RAZORPAYX', 'UPI', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "REFUND_STATUS" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED', 'PROCESSED');

-- CreateEnum
CREATE TYPE "REFUND_AMOUNT_STATUS" AS ENUM ('NONE', 'PARTIALLY_REFUNDED', 'FULLY_REFUNDED');

-- CreateEnum
CREATE TYPE "CONVERSATION_TYPE" AS ENUM ('CUSTOM', 'CONNECTION', 'DISPUTE');

-- CreateEnum
CREATE TYPE "CONVERSATION_STAGE" AS ENUM ('LISTING', 'ORDER', 'DISPUTE');

-- CreateEnum
CREATE TYPE "CONVERSATION_STATUS" AS ENUM ('ACTIVE', 'ARCHIVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PARTICIPANT_TYPE" AS ENUM ('BUYER', 'SELLER', 'MERCHANT', 'ADMIN', 'GUEST');

-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('ACTIVE', 'CHECKED_OUT', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "WEBHOOK_TOPIC" AS ENUM ('ORDERS_CREATE', 'ORDERS_UPDATE', 'ORDERS_CANCELLED', 'ORDERS_PAID', 'PRODUCTS_CREATE', 'PRODUCTS_UPDATE', 'PRODUCTS_DELETE', 'INVENTORY_UPDATE', 'CHECKOUTS_CREATE', 'CHECKOUTS_UPDATE', 'APP_UNINSTALLED', 'SHOP_UPDATE', 'CUSTOMERS_CREATE', 'CUSTOMERS_UPDATE');

-- CreateEnum
CREATE TYPE "WEBHOOK_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'FAILED');

-- CreateEnum
CREATE TYPE "NotificationEvent" AS ENUM ('PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'ORDER_CREATED', 'ORDER_DISPUTE', 'REFUND_PROCESSED');

-- CreateEnum
CREATE TYPE "SYNC_STATUS" AS ENUM ('IDLE', 'SYNCING', 'ERROR', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SESSION_STATUS" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SYNC_TYPE" AS ENUM ('PRODUCTS', 'ORDERS', 'INVENTORY', 'CUSTOMERS', 'WEBHOOKS', 'FULL_SYNC');

-- CreateEnum
CREATE TYPE "SYNC_RESULT" AS ENUM ('SUCCESS', 'PARTIAL', 'FAILED');

-- CreateEnum
CREATE TYPE "PLATFORM_FEE_TYPE" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "FEE_CATEGORY" AS ENUM ('PLATFORM', 'LOGISTICS', 'COD', 'PACKAGING', 'INSURANCE', 'TRANSACTION');

-- CreateEnum
CREATE TYPE "FEE_SOURCE_LEVEL" AS ENUM ('PLATFORM', 'MERCHANT', 'STORE');

-- CreateEnum
CREATE TYPE "FEE_SOURCE" AS ENUM ('GLOBAL', 'MERCHANT_SPECIFIC', 'SHOP');

-- CreateEnum
CREATE TYPE "FEE_TYPE" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "REMITTANCE_CYCLE" AS ENUM ('DAILY', 'WEEKLY', 'ON_DELIVERY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "type" "USER_TYPE" NOT NULL DEFAULT 'BUYER',
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "status" "USER_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "address" JSONB,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "smsVerified" BOOLEAN NOT NULL DEFAULT false,
    "kycVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "bankVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "gstVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "verificationCode" TEXT,
    "verificationSentAt" TIMESTAMP(3),
    "twoFactorVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorQrCode" TEXT,
    "twoFactorStatus" BOOLEAN NOT NULL DEFAULT false,
    "deviceId" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "rememberToken" TEXT,
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),
    "hasSoldBefore" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_kyc_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "merchantId" TEXT,
    "panNumber" TEXT,
    "dateOfBirth" TEXT,
    "fullNameAsPerPan" TEXT,
    "panVerificationStatus" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "panRejectionReason" TEXT,
    "aadharNumber" TEXT,
    "fullNameAsPerAadhar" TEXT,
    "aadhaarReferenceId" TEXT,
    "aadharVerificationStatus" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "aadharRejectionReason" TEXT,
    "gstNumber" TEXT,
    "gstStatus" TEXT,
    "constitution" TEXT,
    "registrationDate" TEXT,
    "businessName" TEXT,
    "businessAddress" JSONB,
    "tradeName" TEXT,
    "gstVerificationStatus" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "gstRejectionReason" TEXT,
    "bankAccountNumber" TEXT,
    "bankIfscCode" TEXT,
    "fullNameAsPerBank" TEXT,
    "bankVerificationStatus" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'DEFAULT',
    "bankRejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_kyc_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "status" "ADMIN_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifiedAt" TIMESTAMP(3),
    "verificationCode" TEXT,
    "verificationSentAt" TIMESTAMP(3),
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchants" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifiedAt" TIMESTAMP(3),
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mode" TEXT NOT NULL DEFAULT 'TEST',
    "image" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_profiles" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "businessType" TEXT,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "aadharNumber" TEXT,
    "bankAccount" TEXT,
    "ifscCode" TEXT,
    "accountHolder" TEXT,
    "kycStatus" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "gstVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "panVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "aadharVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "bankVerified" "USER_VERIFICATION_STATUS" NOT NULL DEFAULT 'PENDING',
    "onboardingStatus" "ONBOARDING_STATUS" NOT NULL DEFAULT 'PENDING',
    "kycDocuments" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_notifications" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "notifyOnNewOrder" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnPayment" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnShipment" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnDelivery" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnReturn" BOOLEAN NOT NULL DEFAULT true,
    "notifyOnDispute" BOOLEAN NOT NULL DEFAULT true,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "whatsappEnabled" BOOLEAN NOT NULL DEFAULT true,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "notificationEmail" TEXT,
    "notificationWhatsApp" TEXT,
    "notificationPhone" TEXT,
    "dailyReportEnabled" BOOLEAN NOT NULL DEFAULT false,
    "weeklyReportEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_preferences" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "defaultPackageProfileId" TEXT,
    "defaultPickupAddressId" TEXT,
    "sortQuotesBy" TEXT NOT NULL DEFAULT 'PRICE',
    "quoteCacheDuration" INTEGER NOT NULL DEFAULT 15,
    "codEnabled" BOOLEAN NOT NULL DEFAULT true,
    "codMinOrderValue" DOUBLE PRECISION DEFAULT 0,
    "returnPolicy" JSONB,
    "slaThresholdDays" INTEGER,
    "remittanceCycle" "REMITTANCE_CYCLE" NOT NULL,
    "allowManualOverride" BOOLEAN NOT NULL DEFAULT true,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_stores" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeUrl" TEXT NOT NULL,
    "customDomain" TEXT,
    "storeSlug" TEXT,
    "externalId" TEXT,
    "connectionType" TEXT NOT NULL,
    "status" "STORE_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "apiKey" TEXT,
    "apiSecret" TEXT,
    "scopes" TEXT,
    "accessToken" TEXT,
    "installedAt" TIMESTAMP(3),
    "uninstalledAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3) NOT NULL,
    "installationCount" INTEGER NOT NULL DEFAULT 1,
    "storeInfo" JSONB,
    "syncStatus" "SYNC_STATUS" NOT NULL DEFAULT 'IDLE',
    "connectedAt" TIMESTAMP(3),
    "lastProductsSyncedAt" TIMESTAMP(3),
    "lastOrdersSyncedAt" TIMESTAMP(3),
    "lastStoreSyncedAt" TIMESTAMP(3),
    "lastWebhookReceivedAt" TIMESTAMP(3),
    "autoSyncProducts" BOOLEAN NOT NULL DEFAULT true,
    "autoSyncOrders" BOOLEAN NOT NULL DEFAULT true,
    "autoSyncInventory" BOOLEAN NOT NULL DEFAULT false,
    "syncInterval" INTEGER NOT NULL DEFAULT 30,
    "syncErrorCount" INTEGER NOT NULL DEFAULT 0,
    "lastSyncError" TEXT,
    "lastSyncErrorAt" TIMESTAMP(3),
    "showOnMarketplace" BOOLEAN NOT NULL DEFAULT false,
    "marketplaceListed" BOOLEAN NOT NULL DEFAULT false,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "extensionInstalled" BOOLEAN NOT NULL DEFAULT false,
    "features" JSONB,
    "orderQuotaLimit" INTEGER,
    "orderQuotaUsed" INTEGER NOT NULL DEFAULT 0,
    "orderQuotaResetAt" TIMESTAMP(3),
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageOrderValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_store_preferences" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "overrideMerchantPrefs" BOOLEAN NOT NULL DEFAULT false,
    "useCustomPackageProfile" BOOLEAN NOT NULL DEFAULT false,
    "customPackageProfileId" TEXT,
    "useCustomPickupAddress" BOOLEAN NOT NULL DEFAULT false,
    "customPickupAddressId" TEXT,
    "sortQuotesBy" TEXT,
    "quoteCacheDuration" INTEGER,
    "codEnabled" BOOLEAN,
    "codMinOrderValue" DOUBLE PRECISION,
    "slaThresholdDays" INTEGER,
    "returnPolicy" JSONB,
    "remittanceCycle" "REMITTANCE_CYCLE" NOT NULL DEFAULT 'WEEKLY',
    "allowManualOverride" BOOLEAN NOT NULL DEFAULT true,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_store_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_configs" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "codFee" DOUBLE PRECISION,
    "podFee" DOUBLE PRECISION,
    "prepaidFee" DOUBLE PRECISION,
    "partialFee" DOUBLE PRECISION,
    "notifyOnNewOrder" BOOLEAN,
    "notifyOnShipment" BOOLEAN,
    "customLogo" TEXT,
    "primaryColor" TEXT,
    "extraSettings" JSONB DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_logistics" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "useCustomSettings" BOOLEAN NOT NULL DEFAULT false,
    "customPickupAddressId" TEXT,
    "customReturnAddressId" TEXT,
    "customPackageProfileId" TEXT,
    "customDefaultCourier" TEXT,
    "customCodEnabled" BOOLEAN,
    "customCodMinOrderValue" DOUBLE PRECISION,
    "customReturnWindowDays" INTEGER,
    "customReturnShippingPaidBy" TEXT,
    "customExchangesEnabled" BOOLEAN,
    "customExchangeWindowDays" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_logistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_notification_settings" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "emailOnNewOrder" BOOLEAN NOT NULL DEFAULT true,
    "emailOnShipment" BOOLEAN NOT NULL DEFAULT true,
    "emailOnDelivery" BOOLEAN NOT NULL DEFAULT true,
    "emailOnReturn" BOOLEAN NOT NULL DEFAULT true,
    "emailOnLowStock" BOOLEAN NOT NULL DEFAULT false,
    "emailOnSyncError" BOOLEAN NOT NULL DEFAULT true,
    "notificationEmails" TEXT[],
    "webhookUrl" TEXT,
    "webhookEvents" JSONB,
    "slackWebhook" TEXT,
    "discordWebhook" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_subscriptions" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "planType" "PLAN_TYPE" NOT NULL DEFAULT 'FREE',
    "billingInterval" TEXT NOT NULL DEFAULT 'MONTHLY',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "orderLimit" INTEGER,
    "featureAccess" JSONB,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "nextBillingDate" TIMESTAMP(3),
    "status" "SUBSCRIPTION_STATUS" NOT NULL DEFAULT 'TRIAL',
    "trialEndsAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancellationReason" TEXT,
    "razorpaySubscriptionId" TEXT,
    "lastPaymentAt" TIMESTAMP(3),
    "lastPaymentAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_api_keys" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "secretHash" TEXT NOT NULL,
    "scopes" TEXT[],
    "mode" "MERCHANT_MODE" NOT NULL,
    "status" "API_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "merchant_api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_webhooks" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" "NotificationEvent"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopify_states" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "shopUrl" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shopify_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopify_temp_sessions" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "scope" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopify_temp_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopify_checkout_sessions" (
    "id" TEXT NOT NULL,
    "storeDomain" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "cartPayload" JSONB NOT NULL,
    "customerPayload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopify_checkout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_webhooks" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "topic" "WEBHOOK_TOPIC" NOT NULL,
    "webhookId" TEXT,
    "address" TEXT NOT NULL,
    "status" "WEBHOOK_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "lastFiredAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "lastFailureAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_sessions" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "cartId" TEXT,
    "checkoutId" TEXT,
    "customerId" TEXT,
    "cartData" JSONB,
    "customerData" JSONB,
    "checkoutUrl" TEXT,
    "status" "SESSION_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "abandonedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_analytics" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "completedOrders" INTEGER NOT NULL DEFAULT 0,
    "cancelledOrders" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageOrderValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "checkoutSessions" INTEGER NOT NULL DEFAULT 0,
    "checkoutCompletions" INTEGER NOT NULL DEFAULT 0,
    "checkoutAbandonment" INTEGER NOT NULL DEFAULT 0,
    "conversionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalProducts" INTEGER NOT NULL DEFAULT 0,
    "productsOutOfStock" INTEGER NOT NULL DEFAULT 0,
    "productsSynced" INTEGER NOT NULL DEFAULT 0,
    "ordersShipped" INTEGER NOT NULL DEFAULT 0,
    "ordersDelivered" INTEGER NOT NULL DEFAULT 0,
    "ordersReturned" INTEGER NOT NULL DEFAULT 0,
    "webhooksReceived" INTEGER NOT NULL DEFAULT 0,
    "webhooksFailed" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_sync_logs" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "syncType" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "successItems" INTEGER NOT NULL,
    "failedItems" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "errorMessage" TEXT,
    "errorDetails" JSONB,
    "triggeredBy" TEXT,
    "triggeredByUser" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "label" TEXT,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "landmark" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_profiles" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "lengthCm" DOUBLE PRECISION NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "weightGrams" INTEGER NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isReusable" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "package_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_logistics" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "defaultPickupAddressId" TEXT,
    "defaultPackageProfileId" TEXT,
    "defaultCourier" TEXT,
    "sortQuotesBy" TEXT NOT NULL DEFAULT 'PRICE',
    "quoteCacheDuration" INTEGER NOT NULL DEFAULT 15,
    "codEnabled" BOOLEAN NOT NULL DEFAULT true,
    "codMinOrderValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "returnsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "returnWindowDays" INTEGER NOT NULL DEFAULT 7,
    "returnConditions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "returnShippingPaidBy" TEXT NOT NULL DEFAULT 'MERCHANT',
    "qcRequired" BOOLEAN NOT NULL DEFAULT false,
    "qcTimeframeDays" INTEGER NOT NULL DEFAULT 2,
    "exchangesEnabled" BOOLEAN NOT NULL DEFAULT false,
    "exchangeWindowDays" INTEGER NOT NULL DEFAULT 7,
    "remittanceCycle" TEXT NOT NULL DEFAULT 'WEEKLY',
    "slaThresholdDays" INTEGER NOT NULL DEFAULT 7,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_logistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_store_pickup_addresses" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_store_pickup_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_store_package_profiles" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "packageProfileId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_store_package_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier_partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "apiBaseUrl" TEXT NOT NULL,
    "authType" "AUTH_TYPE" NOT NULL DEFAULT 'API_KEY',
    "credentialSource" JSONB NOT NULL,
    "headers" JSONB,
    "tokenConfig" JSONB,
    "supportsCOD" BOOLEAN NOT NULL DEFAULT true,
    "supportsTracking" BOOLEAN NOT NULL DEFAULT true,
    "webhookUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isGlobal" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "customMappings" JSONB,
    "serviceRegions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courier_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier_services" (
    "id" TEXT NOT NULL,
    "courierPartnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "externalCode" TEXT NOT NULL,
    "mode" "TRANSPORT_MODE" NOT NULL,
    "deliveryType" "DELIVERY_TYPE" NOT NULL,
    "serviceLevel" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isGlobal" BOOLEAN NOT NULL DEFAULT true,
    "estimatedDeliveryDays" INTEGER,
    "maxCodAmount" DOUBLE PRECISION,
    "minWeight" DOUBLE PRECISION,
    "maxWeight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courier_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_courier_configs" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "courierServiceId" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_courier_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_store_courier_configs" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "courierServiceId" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "labelOverride" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_store_courier_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_slots" (
    "id" TEXT NOT NULL,
    "courierServiceId" TEXT NOT NULL,
    "dayOfWeek" TEXT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "slotLabel" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxPickupsPerDay" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pickup_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier_performance_metrics" (
    "id" TEXT NOT NULL,
    "courierServiceId" TEXT NOT NULL,
    "merchantId" TEXT,
    "storeId" TEXT,
    "region" TEXT,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalShipments" INTEGER NOT NULL,
    "successfulDeliveries" INTEGER NOT NULL,
    "failedDeliveries" INTEGER NOT NULL,
    "rtoCount" INTEGER NOT NULL,
    "avgDeliveryDays" DOUBLE PRECISION NOT NULL,
    "onTimeDeliveryPercent" DOUBLE PRECISION NOT NULL,
    "totalShippingCost" DOUBLE PRECISION NOT NULL,
    "avgShippingCost" DOUBLE PRECISION NOT NULL,
    "totalRTOCharges" DOUBLE PRECISION NOT NULL,
    "successRate" DOUBLE PRECISION NOT NULL,
    "rtoRate" DOUBLE PRECISION NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courier_performance_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "packageDetails" JSONB NOT NULL,
    "pickupAddress" JSONB NOT NULL,
    "dropoffAddress" JSONB NOT NULL,
    "estimatedCharge" DOUBLE PRECISION NOT NULL,
    "deliverySlaDays" INTEGER,
    "isReturnFlow" BOOLEAN NOT NULL DEFAULT false,
    "merchantOverride" JSONB,
    "status" "LOGISTICS_STATUS" NOT NULL DEFAULT 'CREATED',
    "currentLocation" JSONB,
    "lastUpdatedAt" TIMESTAMP(3),
    "quoteFetchStatus" JSONB,
    "autoAssigned" BOOLEAN NOT NULL DEFAULT false,
    "assignmentStrategy" TEXT,
    "autoAssignedAt" TIMESTAMP(3),
    "autoAssignReason" TEXT,
    "bulkJobId" TEXT,
    "preferredPickupDate" TIMESTAMP(3),
    "preferredPickupTime" TEXT,
    "pickupScheduledAt" TIMESTAMP(3),
    "pickupConfirmedAt" TIMESTAMP(3),
    "pickupInstructions" TEXT,
    "selectedCourierId" TEXT,
    "orderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bulk_logistics_jobs" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeId" TEXT,
    "createdBy" TEXT NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "processedOrders" INTEGER NOT NULL DEFAULT 0,
    "successfulOrders" INTEGER NOT NULL DEFAULT 0,
    "failedOrders" INTEGER NOT NULL DEFAULT 0,
    "status" "BULK_JOB_STATUS" NOT NULL DEFAULT 'PENDING',
    "courierServiceId" TEXT,
    "autoSelect" BOOLEAN NOT NULL DEFAULT false,
    "selectionStrategy" TEXT,
    "filters" JSONB,
    "orderIds" TEXT[],
    "results" JSONB,
    "errorLog" JSONB,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bulk_logistics_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier_quotes" (
    "id" TEXT NOT NULL,
    "logisticsId" TEXT NOT NULL,
    "courierCode" TEXT NOT NULL,
    "courierName" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "deliveryType" "DELIVERY_TYPE",
    "serviceLevel" TEXT,
    "shippingCharge" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "estimatedDeliveryDays" INTEGER,
    "estimatedPickupDate" TIMESTAMP(3),
    "validTill" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cacheExpiry" TIMESTAMP(3),
    "fetchStatus" TEXT,
    "errorReason" TEXT,
    "pickupTimeWindow" JSONB,
    "expectedDeliveryDate" TEXT,
    "expectedPODDate" TEXT,
    "originCity" TEXT,
    "destinationCity" TEXT,
    "originRegion" TEXT,
    "destinationRegion" TEXT,
    "serviceCenter" TEXT,
    "areaCode" TEXT,
    "zone" TEXT,
    "mode" TEXT,
    "additionalDays" INTEGER,
    "apexAdditionalDays" INTEGER,
    "groundAdditionalDays" INTEGER,
    "edlMessage" BOOLEAN,
    "transitErrorMessage" TEXT,
    "actualWeight" DOUBLE PRECISION,
    "volumetricWeight" DOUBLE PRECISION,
    "chargeableWeight" DOUBLE PRECISION,
    "chargedBy" TEXT,
    "baseRate" DOUBLE PRECISION,
    "fuelSurcharge" DOUBLE PRECISION,
    "codCharge" DOUBLE PRECISION,
    "totalCharge" DOUBLE PRECISION,
    "codSupported" BOOLEAN NOT NULL DEFAULT true,
    "trackingSupport" BOOLEAN NOT NULL DEFAULT true,
    "labelOverride" TEXT,
    "rating" DOUBLE PRECISION,
    "courierPartnerId" TEXT,
    "courierServiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courier_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippings" (
    "id" TEXT NOT NULL,
    "logisticsId" TEXT,
    "selectedCourierQuoteId" TEXT,
    "trackingId" TEXT,
    "shippingSource" "SHIPPING_SOURCE" NOT NULL DEFAULT 'ORDER',
    "deliveryAddress" JSONB NOT NULL,
    "deliveryInstructions" TEXT,
    "expectedDeliveryDate" TIMESTAMP(3),
    "weight" DOUBLE PRECISION,
    "weightUnit" TEXT DEFAULT 'kg',
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "dimensionUnit" TEXT DEFAULT 'cm',
    "codAmount" DOUBLE PRECISION,
    "status" "DELIVERY_STATUS" NOT NULL DEFAULT 'PENDING',
    "shippedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "returnedAt" TIMESTAMP(3),
    "returnReason" TEXT,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "ndrReason" TEXT,
    "rtoInitiatedAt" TIMESTAMP(3),
    "trackingUrl" TEXT,
    "trackingStatus" "DELIVERY_STATUS",
    "isRTO" BOOLEAN NOT NULL DEFAULT false,
    "rtoReason" TEXT,
    "rtoStatus" TEXT,
    "rtoCompletedAt" TIMESTAMP(3),
    "rtoCharges" DOUBLE PRECISION,
    "rtoChargesPaidBy" TEXT,
    "rtoDeductedFromMerchant" BOOLEAN NOT NULL DEFAULT false,
    "rtoDeductionId" TEXT,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_verifications" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_documents" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "type" "DOCUMENT_TYPE" NOT NULL,
    "url" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "shipping_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_events" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "status" "DELIVERY_STATUS" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "remarks" TEXT,
    "eventCode" TEXT,
    "actor" TEXT,

    CONSTRAINT "tracking_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ndr_attempts" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "ndrDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ndrReason" TEXT NOT NULL,
    "ndrReasonCode" TEXT,
    "courierRemarks" TEXT,
    "status" "NDR_STATUS" NOT NULL DEFAULT 'REPORTED',
    "customerContacted" BOOLEAN NOT NULL DEFAULT false,
    "customerContactedAt" TIMESTAMP(3),
    "customerResponse" JSONB,
    "reattemptScheduledAt" TIMESTAMP(3),
    "reattemptDate" TIMESTAMP(3),
    "reattemptTimeSlot" TEXT,
    "reattemptAddress" JSONB,
    "resolvedAt" TIMESTAMP(3),
    "resolutionType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ndr_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manifests" (
    "id" TEXT NOT NULL,
    "manifestNumber" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeId" TEXT,
    "courierServiceId" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT,
    "pickupAddressId" TEXT NOT NULL,
    "totalShipments" INTEGER NOT NULL,
    "totalWeight" DOUBLE PRECISION NOT NULL,
    "totalCODAmount" DOUBLE PRECISION,
    "status" "MANIFEST_STATUS" NOT NULL DEFAULT 'DRAFT',
    "manifestUrl" TEXT,
    "generatedAt" TIMESTAMP(3),
    "handedOverAt" TIMESTAMP(3),
    "handedOverBy" TEXT,
    "receivedBy" TEXT,
    "courierSignature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manifests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manifest_shipments" (
    "id" TEXT NOT NULL,
    "manifestId" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "waybillNumber" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "codAmount" DOUBLE PRECISION,

    CONSTRAINT "manifest_shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_products" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "weight" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "inventoryQty" INTEGER,
    "sku" TEXT,
    "barcode" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "lastFetchedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_product_variants" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT,
    "barcode" TEXT,
    "inventoryQty" INTEGER,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_carts" (
    "id" TEXT NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" TEXT,
    "guestSessionTokenId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_cart_items" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "shopProductId" TEXT NOT NULL,
    "shopProductVariantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceSnapshot" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_session_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "guestInfo" JSONB,
    "expiresAt" TIMESTAMP(3),
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_session_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_order_groups" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT,
    "guestSessionTokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "externalId" TEXT,
    "source" "ORDER_GROUP_SOURCE" NOT NULL DEFAULT 'RAKSHASETU',
    "status" "ORDER_GROUP_STATUS" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "groupType" "ORDER_GROUP_TYPE" NOT NULL DEFAULT 'MARKETPLACE',
    "groupNotes" TEXT,
    "deliverySummary" JSONB,

    CONSTRAINT "shop_order_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_orders" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "source" "SHOP_ORDER_SOURCE" NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "syncedAt" TIMESTAMP(3),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "subtotalPrice" DOUBLE PRECISION,
    "totalTax" DOUBLE PRECISION,
    "totalDiscounts" DOUBLE PRECISION,
    "financialStatus" "PAYMENT_STATUS",
    "fulfillmentStatus" "FULFILLMENT_STATUS",
    "sourceName" TEXT,
    "paymentGateway" TEXT,
    "discountCodes" JSONB,
    "shippingLines" JSONB,
    "note" TEXT,
    "tags" TEXT,
    "customerId" TEXT,
    "customerName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "shippingAddress" JSONB,
    "billingAddress" JSONB,
    "packageDetails" JSONB,
    "guestSessionTokenId" TEXT,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'CREATED',
    "paymentType" "PAYMENT_METHOD",
    "shippingCharge" DOUBLE PRECISION,
    "codCharge" DOUBLE PRECISION,
    "platformFee" DOUBLE PRECISION,
    "isEscrowed" BOOLEAN NOT NULL DEFAULT false,
    "escrowStatus" "ESCROW_STATUS",
    "escrowMeta" JSONB,
    "shopOrderGroupId" TEXT,

    CONSTRAINT "shop_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT,
    "fulfillmentStatus" TEXT,
    "isReturnable" BOOLEAN NOT NULL DEFAULT true,
    "returnWindowDays" INTEGER,

    CONSTRAINT "shop_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_transactions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "buyerPaid" DOUBLE PRECISION NOT NULL,
    "chargesDeducted" DOUBLE PRECISION NOT NULL,
    "sellerReceives" DOUBLE PRECISION NOT NULL,
    "platformFee" DOUBLE PRECISION,
    "platformFeePayer" "SHOP_PLATFORM_FEE_PAYER" NOT NULL DEFAULT 'MERCHANT',
    "shippingCharge" DOUBLE PRECISION,
    "codCharge" DOUBLE PRECISION,
    "status" "TRANSACTION_STATUS" NOT NULL DEFAULT 'INITIATED',
    "releaseRequested" BOOLEAN NOT NULL DEFAULT false,
    "releaseRequestedAt" TIMESTAMP(3),
    "releaseRequestedByType" "USER_ROLE",
    "releaseRequestedById" TEXT,
    "releaseRequestedMeta" JSONB,
    "releaseApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "releaseApprovedAt" TIMESTAMP(3),
    "releaseApprovedByAdminId" TEXT,
    "releaseNotes" TEXT,
    "releaseRequestedByGuestTokenId" TEXT,
    "codRemittanceDueAt" TIMESTAMP(3),
    "codRemittedAt" TIMESTAMP(3),
    "codRemittanceNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_payments" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT,
    "merchantId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "method" "PAYMENT_METHOD" NOT NULL,
    "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'INITIATED',
    "source" "PAYMENT_ORDER_SOURCE" NOT NULL DEFAULT 'SHOP',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "providerTxnId" TEXT,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "paidAt" TIMESTAMP(3),
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "codCollected" BOOLEAN NOT NULL DEFAULT false,
    "codCollectedAt" TIMESTAMP(3),
    "guestSessionTokenId" TEXT,
    "orderGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "return_requests" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "reason" "RETURN_REASON" NOT NULL,
    "status" "RETURN_STATUS" NOT NULL DEFAULT 'REQUESTED',
    "refundAmount" DOUBLE PRECISION,
    "exchangeVariantId" TEXT,
    "pickupScheduledAt" TIMESTAMP(3),
    "pickupCourierCode" TEXT,
    "refundSynced" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "return_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_dispute_tickets" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "raisedBy" "USER_ROLE" NOT NULL,
    "raisedById" TEXT,
    "customerInfo" JSONB,
    "reason" TEXT NOT NULL,
    "status" "DISPUTE_STATUS" NOT NULL DEFAULT 'PENDING',
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "resolvedByAdminId" TEXT,

    CONSTRAINT "shop_dispute_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_refunds" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT,
    "orderId" TEXT,
    "transactionId" TEXT,
    "refundedAt" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "refundMethod" "REFUND_METHOD" NOT NULL,
    "notes" TEXT,
    "status" "REFUND_STATUS" NOT NULL DEFAULT 'PENDING',
    "refundAmountStatus" "REFUND_AMOUNT_STATUS" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "earningsBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "creditBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalWithdrawn" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalCharges" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seller_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller_deductions" (
    "id" TEXT NOT NULL,
    "sellerAccountId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "DEDUCTION_TYPE" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "DEDUCTION_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seller_deductions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "type" "LISTING_TYPE" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "LISTING_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "tags" TEXT[],
    "metadata" JSONB,
    "media" JSONB,
    "externalLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT,
    "sellerId" TEXT NOT NULL,
    "message" VARCHAR(500),
    "status" "CONNECT_STATUS" NOT NULL DEFAULT 'PENDING',
    "rejectReason" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderType" "ORDER_TYPE" NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "status" "MARKETPLACE_ORDER_STATUS" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "orderStatus" "ORDER_FLOW_STATUS" NOT NULL DEFAULT 'PENDING',
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listingId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "id" TEXT NOT NULL,
    "orderType" "ORDER_TYPE" NOT NULL,
    "listingId" TEXT,
    "listingDetails" JSONB,
    "customDetails" JSONB,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "platformFee" DOUBLE PRECISION NOT NULL,
    "platformFeePayer" "PLATFORM_FEE_PAYER" NOT NULL DEFAULT 'BUYER',
    "sellerReceives" DOUBLE PRECISION NOT NULL,
    "buyerAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_attachments" (
    "id" TEXT NOT NULL,
    "orderDetailsId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "buyerPaid" DOUBLE PRECISION NOT NULL,
    "chargesDeducted" DOUBLE PRECISION NOT NULL,
    "sellerReceives" DOUBLE PRECISION NOT NULL,
    "status" "TRANSACTION_STATUS" NOT NULL DEFAULT 'INITIATED',
    "releaseRequested" BOOLEAN NOT NULL DEFAULT false,
    "releaseRequestedAt" TIMESTAMP(3),
    "releaseRequestedByType" "USER_ROLE",
    "releaseRequestedById" TEXT,
    "releaseRequestedMeta" JSONB,
    "releaseApprovedByAdmin" BOOLEAN NOT NULL DEFAULT false,
    "releaseApprovedAt" TIMESTAMP(3),
    "releaseApprovedByAdminId" TEXT,
    "releaseNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "method" "PAYMENT_METHOD" NOT NULL DEFAULT 'PREPAID',
    "status" "PAYMENT_STATUS" NOT NULL DEFAULT 'INITIATED',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "providerTxnId" TEXT,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "paidAt" TIMESTAMP(3),
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_tickets" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "raisedBy" "DISPUTE_ROLE" NOT NULL,
    "raisedById" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "DISPUTE_STATUS" NOT NULL DEFAULT 'PENDING',
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "resolvedByAdminId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "dispute_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refunds" (
    "id" TEXT NOT NULL,
    "disputeId" TEXT,
    "orderId" TEXT,
    "transactionId" TEXT,
    "refundedAt" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "refundMethod" "REFUND_METHOD" NOT NULL,
    "notes" TEXT,
    "status" "REFUND_STATUS" NOT NULL DEFAULT 'PENDING',
    "refundAmountStatus" "REFUND_AMOUNT_STATUS" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "link" TEXT,
    "data" JSONB,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "type" "CONVERSATION_TYPE" NOT NULL,
    "stage" "CONVERSATION_STAGE" NOT NULL DEFAULT 'LISTING',
    "status" "CONVERSATION_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "listingId" TEXT,
    "orderId" TEXT,
    "disputeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_participants" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "participantType" "PARTICIPANT_TYPE" NOT NULL,
    "participantId" TEXT,
    "customerInfo" JSONB,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderType" "PARTICIPANT_TYPE" NOT NULL,
    "senderId" TEXT,
    "customerInfo" JSONB,
    "content" TEXT NOT NULL,
    "attachments" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_accounts" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "availableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "pendingCharges" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalWithdrawn" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalCharges" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "payoutMethod" TEXT,
    "lastPayoutAt" TIMESTAMP(3),
    "payoutFrequency" TEXT NOT NULL DEFAULT 'MANUAL',
    "auditTrail" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_deductions" (
    "id" TEXT NOT NULL,
    "merchantAccountId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "triggeredBy" TEXT NOT NULL DEFAULT 'SYSTEM',
    "settledAt" TIMESTAMP(3),
    "waivedBy" TEXT,
    "shippingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_deductions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout_transactions" (
    "id" TEXT NOT NULL,
    "merchantAccountId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "externalTxnId" TEXT,
    "referenceNote" TEXT,
    "failureReason" TEXT,
    "initiatedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "payout_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_fee_configs" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "feeType" TEXT NOT NULL,
    "feeValue" DOUBLE PRECISION NOT NULL,
    "codFee" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_fee_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_platform_fees" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "feeType" TEXT NOT NULL,
    "feeValue" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchant_platform_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_platform_fees" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "feeType" TEXT NOT NULL,
    "feeValue" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_platform_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_fee_logs" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "merchantId" TEXT,
    "storeId" TEXT,
    "category" "FEE_CATEGORY" NOT NULL,
    "sourceLevel" "FEE_SOURCE_LEVEL" NOT NULL,
    "sourceId" TEXT,
    "feeType" "PLATFORM_FEE_TYPE" NOT NULL,
    "feeValue" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "label" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_fee_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL,
    "feeSource" "FEE_SOURCE" NOT NULL DEFAULT 'GLOBAL',
    "feeType" "FEE_TYPE" NOT NULL DEFAULT 'PERCENTAGE',
    "feeValue" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RolePermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_kyc_details_userId_key" ON "user_kyc_details"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_kyc_details_merchantId_key" ON "user_kyc_details"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userName_key" ON "admins"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_roles_name_key" ON "admin_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_permissions_name_key" ON "admin_permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "merchants_email_key" ON "merchants"("email");

-- CreateIndex
CREATE INDEX "merchants_email_idx" ON "merchants"("email");

-- CreateIndex
CREATE INDEX "merchants_status_idx" ON "merchants"("status");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_profiles_merchantId_key" ON "merchant_profiles"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_notifications_merchantId_key" ON "merchant_notifications"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_preferences_merchantId_key" ON "merchant_preferences"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_stores_storeSlug_key" ON "merchant_stores"("storeSlug");

-- CreateIndex
CREATE INDEX "merchant_stores_merchantId_idx" ON "merchant_stores"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_stores_storeUrl_idx" ON "merchant_stores"("storeUrl");

-- CreateIndex
CREATE INDEX "merchant_stores_storeSlug_idx" ON "merchant_stores"("storeSlug");

-- CreateIndex
CREATE INDEX "merchant_stores_status_idx" ON "merchant_stores"("status");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_stores_merchantId_storeUrl_key" ON "merchant_stores"("merchantId", "storeUrl");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_store_preferences_storeId_key" ON "merchant_store_preferences"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_configs_storeId_key" ON "store_configs"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_logistics_storeId_key" ON "store_logistics"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_notification_settings_storeId_key" ON "store_notification_settings"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_subscriptions_storeId_key" ON "store_subscriptions"("storeId");

-- CreateIndex
CREATE INDEX "store_subscriptions_storeId_idx" ON "store_subscriptions"("storeId");

-- CreateIndex
CREATE INDEX "store_subscriptions_status_idx" ON "store_subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_api_keys_publicKey_key" ON "merchant_api_keys"("publicKey");

-- CreateIndex
CREATE INDEX "merchant_api_keys_merchantId_idx" ON "merchant_api_keys"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_webhooks_merchantId_idx" ON "merchant_webhooks"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_states_state_key" ON "shopify_states"("state");

-- CreateIndex
CREATE INDEX "shopify_states_merchantId_idx" ON "shopify_states"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_temp_sessions_shop_key" ON "shopify_temp_sessions"("shop");

-- CreateIndex
CREATE INDEX "shopify_checkout_sessions_storeDomain_idx" ON "shopify_checkout_sessions"("storeDomain");

-- CreateIndex
CREATE INDEX "shopify_checkout_sessions_ownerEmail_idx" ON "shopify_checkout_sessions"("ownerEmail");

-- CreateIndex
CREATE INDEX "shopify_checkout_sessions_expiresAt_idx" ON "shopify_checkout_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "store_webhooks_storeId_status_idx" ON "store_webhooks"("storeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "store_webhooks_storeId_topic_key" ON "store_webhooks"("storeId", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "store_sessions_sessionToken_key" ON "store_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "store_sessions_storeId_status_idx" ON "store_sessions"("storeId", "status");

-- CreateIndex
CREATE INDEX "store_sessions_sessionToken_idx" ON "store_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "store_sessions_expiresAt_idx" ON "store_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "store_analytics_storeId_idx" ON "store_analytics"("storeId");

-- CreateIndex
CREATE INDEX "store_analytics_date_idx" ON "store_analytics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "store_analytics_storeId_date_key" ON "store_analytics"("storeId", "date");

-- CreateIndex
CREATE INDEX "store_sync_logs_storeId_syncType_idx" ON "store_sync_logs"("storeId", "syncType");

-- CreateIndex
CREATE INDEX "store_sync_logs_startedAt_idx" ON "store_sync_logs"("startedAt");

-- CreateIndex
CREATE INDEX "addresses_merchantId_idx" ON "addresses"("merchantId");

-- CreateIndex
CREATE INDEX "addresses_merchantId_type_idx" ON "addresses"("merchantId", "type");

-- CreateIndex
CREATE INDEX "addresses_isDefault_idx" ON "addresses"("isDefault");

-- CreateIndex
CREATE INDEX "package_profiles_merchantId_idx" ON "package_profiles"("merchantId");

-- CreateIndex
CREATE INDEX "package_profiles_isDefault_idx" ON "package_profiles"("isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_logistics_merchantId_key" ON "merchant_logistics"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_store_pickup_addresses_storeId_idx" ON "merchant_store_pickup_addresses"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_store_pickup_addresses_storeId_addressId_key" ON "merchant_store_pickup_addresses"("storeId", "addressId");

-- CreateIndex
CREATE INDEX "merchant_store_package_profiles_storeId_idx" ON "merchant_store_package_profiles"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_store_package_profiles_storeId_packageProfileId_key" ON "merchant_store_package_profiles"("storeId", "packageProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "courier_partners_code_key" ON "courier_partners"("code");

-- CreateIndex
CREATE INDEX "courier_partners_isActive_idx" ON "courier_partners"("isActive");

-- CreateIndex
CREATE INDEX "courier_services_courierPartnerId_idx" ON "courier_services"("courierPartnerId");

-- CreateIndex
CREATE INDEX "courier_services_isActive_idx" ON "courier_services"("isActive");

-- CreateIndex
CREATE INDEX "merchant_courier_configs_merchantId_idx" ON "merchant_courier_configs"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_courier_configs_merchantId_courierServiceId_key" ON "merchant_courier_configs"("merchantId", "courierServiceId");

-- CreateIndex
CREATE INDEX "merchant_store_courier_configs_storeId_idx" ON "merchant_store_courier_configs"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_store_courier_configs_storeId_courierServiceId_key" ON "merchant_store_courier_configs"("storeId", "courierServiceId");

-- CreateIndex
CREATE INDEX "pickup_slots_courierServiceId_idx" ON "pickup_slots"("courierServiceId");

-- CreateIndex
CREATE INDEX "courier_performance_metrics_courierServiceId_idx" ON "courier_performance_metrics"("courierServiceId");

-- CreateIndex
CREATE INDEX "courier_performance_metrics_merchantId_idx" ON "courier_performance_metrics"("merchantId");

-- CreateIndex
CREATE INDEX "courier_performance_metrics_storeId_idx" ON "courier_performance_metrics"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "courier_performance_metrics_courierServiceId_merchantId_sto_key" ON "courier_performance_metrics"("courierServiceId", "merchantId", "storeId", "region", "periodStart");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_selectedCourierId_key" ON "logistics"("selectedCourierId");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_orderId_key" ON "logistics"("orderId");

-- CreateIndex
CREATE INDEX "logistics_customerId_idx" ON "logistics"("customerId");

-- CreateIndex
CREATE INDEX "logistics_status_idx" ON "logistics"("status");

-- CreateIndex
CREATE INDEX "logistics_bulkJobId_idx" ON "logistics"("bulkJobId");

-- CreateIndex
CREATE INDEX "bulk_logistics_jobs_merchantId_idx" ON "bulk_logistics_jobs"("merchantId");

-- CreateIndex
CREATE INDEX "bulk_logistics_jobs_storeId_idx" ON "bulk_logistics_jobs"("storeId");

-- CreateIndex
CREATE INDEX "bulk_logistics_jobs_status_idx" ON "bulk_logistics_jobs"("status");

-- CreateIndex
CREATE INDEX "courier_quotes_logisticsId_idx" ON "courier_quotes"("logisticsId");

-- CreateIndex
CREATE INDEX "courier_quotes_courierPartnerId_idx" ON "courier_quotes"("courierPartnerId");

-- CreateIndex
CREATE INDEX "courier_quotes_courierServiceId_idx" ON "courier_quotes"("courierServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "shippings_trackingId_key" ON "shippings"("trackingId");

-- CreateIndex
CREATE UNIQUE INDEX "shippings_orderId_key" ON "shippings"("orderId");

-- CreateIndex
CREATE INDEX "shippings_logisticsId_idx" ON "shippings"("logisticsId");

-- CreateIndex
CREATE INDEX "shippings_trackingId_idx" ON "shippings"("trackingId");

-- CreateIndex
CREATE INDEX "shippings_selectedCourierQuoteId_idx" ON "shippings"("selectedCourierQuoteId");

-- CreateIndex
CREATE INDEX "shippings_status_idx" ON "shippings"("status");

-- CreateIndex
CREATE INDEX "delivery_verifications_shippingId_idx" ON "delivery_verifications"("shippingId");

-- CreateIndex
CREATE INDEX "shipping_documents_shippingId_idx" ON "shipping_documents"("shippingId");

-- CreateIndex
CREATE INDEX "tracking_events_shippingId_idx" ON "tracking_events"("shippingId");

-- CreateIndex
CREATE INDEX "tracking_events_timestamp_idx" ON "tracking_events"("timestamp");

-- CreateIndex
CREATE INDEX "ndr_attempts_shippingId_idx" ON "ndr_attempts"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "ndr_attempts_shippingId_attemptNumber_key" ON "ndr_attempts"("shippingId", "attemptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "manifests_manifestNumber_key" ON "manifests"("manifestNumber");

-- CreateIndex
CREATE INDEX "manifests_manifestNumber_idx" ON "manifests"("manifestNumber");

-- CreateIndex
CREATE INDEX "manifests_merchantId_pickupDate_idx" ON "manifests"("merchantId", "pickupDate");

-- CreateIndex
CREATE INDEX "manifests_status_idx" ON "manifests"("status");

-- CreateIndex
CREATE INDEX "manifest_shipments_manifestId_idx" ON "manifest_shipments"("manifestId");

-- CreateIndex
CREATE UNIQUE INDEX "manifest_shipments_manifestId_shippingId_key" ON "manifest_shipments"("manifestId", "shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_products_externalId_key" ON "shop_products"("externalId");

-- CreateIndex
CREATE INDEX "shop_products_merchantId_idx" ON "shop_products"("merchantId");

-- CreateIndex
CREATE INDEX "shop_products_storeId_idx" ON "shop_products"("storeId");

-- CreateIndex
CREATE INDEX "shop_products_externalId_idx" ON "shop_products"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_product_variants_externalId_key" ON "shop_product_variants"("externalId");

-- CreateIndex
CREATE INDEX "shop_product_variants_productId_idx" ON "shop_product_variants"("productId");

-- CreateIndex
CREATE INDEX "shop_product_variants_externalId_idx" ON "shop_product_variants"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_carts_userId_key" ON "shop_carts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_carts_guestSessionTokenId_key" ON "shop_carts"("guestSessionTokenId");

-- CreateIndex
CREATE INDEX "shop_carts_status_idx" ON "shop_carts"("status");

-- CreateIndex
CREATE INDEX "shop_carts_userId_idx" ON "shop_carts"("userId");

-- CreateIndex
CREATE INDEX "shop_carts_guestSessionTokenId_idx" ON "shop_carts"("guestSessionTokenId");

-- CreateIndex
CREATE INDEX "shop_cart_items_cartId_idx" ON "shop_cart_items"("cartId");

-- CreateIndex
CREATE INDEX "shop_cart_items_shopProductId_idx" ON "shop_cart_items"("shopProductId");

-- CreateIndex
CREATE UNIQUE INDEX "guest_session_tokens_token_key" ON "guest_session_tokens"("token");

-- CreateIndex
CREATE INDEX "guest_session_tokens_token_idx" ON "guest_session_tokens"("token");

-- CreateIndex
CREATE INDEX "guest_session_tokens_guestId_idx" ON "guest_session_tokens"("guestId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_order_groups_externalId_key" ON "shop_order_groups"("externalId");

-- CreateIndex
CREATE INDEX "shop_order_groups_buyerId_idx" ON "shop_order_groups"("buyerId");

-- CreateIndex
CREATE INDEX "shop_order_groups_guestSessionTokenId_idx" ON "shop_order_groups"("guestSessionTokenId");

-- CreateIndex
CREATE INDEX "shop_order_groups_createdAt_idx" ON "shop_order_groups"("createdAt");

-- CreateIndex
CREATE INDEX "shop_order_groups_status_idx" ON "shop_order_groups"("status");

-- CreateIndex
CREATE UNIQUE INDEX "shop_orders_externalId_key" ON "shop_orders"("externalId");

-- CreateIndex
CREATE INDEX "shop_orders_merchantId_idx" ON "shop_orders"("merchantId");

-- CreateIndex
CREATE INDEX "shop_orders_storeId_idx" ON "shop_orders"("storeId");

-- CreateIndex
CREATE INDEX "shop_orders_externalId_idx" ON "shop_orders"("externalId");

-- CreateIndex
CREATE INDEX "shop_orders_shopOrderGroupId_idx" ON "shop_orders"("shopOrderGroupId");

-- CreateIndex
CREATE INDEX "shop_orders_status_idx" ON "shop_orders"("status");

-- CreateIndex
CREATE INDEX "shop_order_items_orderId_idx" ON "shop_order_items"("orderId");

-- CreateIndex
CREATE INDEX "shop_order_items_productId_idx" ON "shop_order_items"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "shop_transactions_orderId_key" ON "shop_transactions"("orderId");

-- CreateIndex
CREATE INDEX "shop_transactions_orderId_idx" ON "shop_transactions"("orderId");

-- CreateIndex
CREATE INDEX "shop_transactions_status_idx" ON "shop_transactions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "shop_payments_orderGroupId_key" ON "shop_payments"("orderGroupId");

-- CreateIndex
CREATE INDEX "shop_payments_buyerId_idx" ON "shop_payments"("buyerId");

-- CreateIndex
CREATE INDEX "shop_payments_merchantId_idx" ON "shop_payments"("merchantId");

-- CreateIndex
CREATE INDEX "shop_payments_status_idx" ON "shop_payments"("status");

-- CreateIndex
CREATE INDEX "return_requests_orderId_idx" ON "return_requests"("orderId");

-- CreateIndex
CREATE INDEX "return_requests_status_idx" ON "return_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "shop_dispute_tickets_orderId_key" ON "shop_dispute_tickets"("orderId");

-- CreateIndex
CREATE INDEX "shop_dispute_tickets_orderId_idx" ON "shop_dispute_tickets"("orderId");

-- CreateIndex
CREATE INDEX "shop_dispute_tickets_status_idx" ON "shop_dispute_tickets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "shop_refunds_disputeId_key" ON "shop_refunds"("disputeId");

-- CreateIndex
CREATE INDEX "shop_refunds_disputeId_idx" ON "shop_refunds"("disputeId");

-- CreateIndex
CREATE INDEX "shop_refunds_orderId_idx" ON "shop_refunds"("orderId");

-- CreateIndex
CREATE INDEX "shop_refunds_status_idx" ON "shop_refunds"("status");

-- CreateIndex
CREATE UNIQUE INDEX "seller_accounts_userId_key" ON "seller_accounts"("userId");

-- CreateIndex
CREATE INDEX "seller_deductions_sellerAccountId_idx" ON "seller_deductions"("sellerAccountId");

-- CreateIndex
CREATE INDEX "listings_sellerId_idx" ON "listings"("sellerId");

-- CreateIndex
CREATE INDEX "listings_status_idx" ON "listings"("status");

-- CreateIndex
CREATE INDEX "listings_type_idx" ON "listings"("type");

-- CreateIndex
CREATE INDEX "connects_userId_idx" ON "connects"("userId");

-- CreateIndex
CREATE INDEX "connects_sellerId_idx" ON "connects"("sellerId");

-- CreateIndex
CREATE INDEX "connects_listingId_idx" ON "connects"("listingId");

-- CreateIndex
CREATE INDEX "orders_buyerId_idx" ON "orders"("buyerId");

-- CreateIndex
CREATE INDEX "orders_sellerId_idx" ON "orders"("sellerId");

-- CreateIndex
CREATE INDEX "orders_listingId_idx" ON "orders"("listingId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE UNIQUE INDEX "order_details_orderId_key" ON "order_details"("orderId");

-- CreateIndex
CREATE INDEX "order_attachments_orderDetailsId_idx" ON "order_attachments"("orderDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_orderId_key" ON "transactions"("orderId");

-- CreateIndex
CREATE INDEX "transactions_orderId_idx" ON "transactions"("orderId");

-- CreateIndex
CREATE INDEX "transactions_status_idx" ON "transactions"("status");

-- CreateIndex
CREATE INDEX "payments_orderId_transactionId_idx" ON "payments"("orderId", "transactionId");

-- CreateIndex
CREATE INDEX "payments_buyerId_idx" ON "payments"("buyerId");

-- CreateIndex
CREATE INDEX "payments_sellerId_idx" ON "payments"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "dispute_tickets_orderId_key" ON "dispute_tickets"("orderId");

-- CreateIndex
CREATE INDEX "dispute_tickets_orderId_idx" ON "dispute_tickets"("orderId");

-- CreateIndex
CREATE INDEX "dispute_tickets_status_idx" ON "dispute_tickets"("status");

-- CreateIndex
CREATE UNIQUE INDEX "refunds_disputeId_key" ON "refunds"("disputeId");

-- CreateIndex
CREATE INDEX "refunds_disputeId_idx" ON "refunds"("disputeId");

-- CreateIndex
CREATE INDEX "refunds_orderId_idx" ON "refunds"("orderId");

-- CreateIndex
CREATE INDEX "refunds_status_idx" ON "refunds"("status");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_event_idx" ON "notifications"("event");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_disputeId_key" ON "conversations"("disputeId");

-- CreateIndex
CREATE INDEX "conversations_listingId_idx" ON "conversations"("listingId");

-- CreateIndex
CREATE INDEX "conversations_orderId_idx" ON "conversations"("orderId");

-- CreateIndex
CREATE INDEX "conversations_disputeId_idx" ON "conversations"("disputeId");

-- CreateIndex
CREATE INDEX "conversation_participants_conversationId_idx" ON "conversation_participants"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_participants_conversationId_participantType_pa_key" ON "conversation_participants"("conversationId", "participantType", "participantId");

-- CreateIndex
CREATE INDEX "messages_conversationId_idx" ON "messages"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_accounts_merchantId_key" ON "merchant_accounts"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_deductions_merchantAccountId_idx" ON "merchant_deductions"("merchantAccountId");

-- CreateIndex
CREATE INDEX "merchant_deductions_merchantId_idx" ON "merchant_deductions"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_deductions_referenceId_idx" ON "merchant_deductions"("referenceId");

-- CreateIndex
CREATE INDEX "payout_transactions_merchantAccountId_idx" ON "payout_transactions"("merchantAccountId");

-- CreateIndex
CREATE INDEX "payout_transactions_status_idx" ON "payout_transactions"("status");

-- CreateIndex
CREATE INDEX "platform_fee_configs_category_idx" ON "platform_fee_configs"("category");

-- CreateIndex
CREATE INDEX "merchant_platform_fees_merchantId_idx" ON "merchant_platform_fees"("merchantId");

-- CreateIndex
CREATE INDEX "merchant_platform_fees_category_idx" ON "merchant_platform_fees"("category");

-- CreateIndex
CREATE INDEX "store_platform_fees_storeId_idx" ON "store_platform_fees"("storeId");

-- CreateIndex
CREATE INDEX "store_platform_fees_category_idx" ON "store_platform_fees"("category");

-- CreateIndex
CREATE INDEX "platform_fee_logs_orderId_idx" ON "platform_fee_logs"("orderId");

-- CreateIndex
CREATE INDEX "platform_fee_logs_merchantId_idx" ON "platform_fee_logs"("merchantId");

-- CreateIndex
CREATE INDEX "platform_fee_logs_storeId_idx" ON "platform_fee_logs"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "_RolePermissions_AB_unique" ON "_RolePermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_RolePermissions_B_index" ON "_RolePermissions"("B");

-- AddForeignKey
ALTER TABLE "user_kyc_details" ADD CONSTRAINT "user_kyc_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_kyc_details" ADD CONSTRAINT "user_kyc_details_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "admin_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_profiles" ADD CONSTRAINT "merchant_profiles_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_notifications" ADD CONSTRAINT "merchant_notifications_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_preferences" ADD CONSTRAINT "merchant_preferences_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_preferences" ADD CONSTRAINT "merchant_preferences_defaultPackageProfileId_fkey" FOREIGN KEY ("defaultPackageProfileId") REFERENCES "package_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_preferences" ADD CONSTRAINT "merchant_preferences_defaultPickupAddressId_fkey" FOREIGN KEY ("defaultPickupAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_stores" ADD CONSTRAINT "merchant_stores_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_preferences" ADD CONSTRAINT "merchant_store_preferences_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_preferences" ADD CONSTRAINT "merchant_store_preferences_customPackageProfileId_fkey" FOREIGN KEY ("customPackageProfileId") REFERENCES "package_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_preferences" ADD CONSTRAINT "merchant_store_preferences_customPickupAddressId_fkey" FOREIGN KEY ("customPickupAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_configs" ADD CONSTRAINT "store_configs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_logistics" ADD CONSTRAINT "store_logistics_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_logistics" ADD CONSTRAINT "store_logistics_customPickupAddressId_fkey" FOREIGN KEY ("customPickupAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_logistics" ADD CONSTRAINT "store_logistics_customReturnAddressId_fkey" FOREIGN KEY ("customReturnAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_logistics" ADD CONSTRAINT "store_logistics_customPackageProfileId_fkey" FOREIGN KEY ("customPackageProfileId") REFERENCES "package_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_notification_settings" ADD CONSTRAINT "store_notification_settings_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_subscriptions" ADD CONSTRAINT "store_subscriptions_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_api_keys" ADD CONSTRAINT "merchant_api_keys_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_webhooks" ADD CONSTRAINT "merchant_webhooks_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopify_states" ADD CONSTRAINT "shopify_states_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_webhooks" ADD CONSTRAINT "store_webhooks_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_sessions" ADD CONSTRAINT "store_sessions_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_analytics" ADD CONSTRAINT "store_analytics_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_sync_logs" ADD CONSTRAINT "store_sync_logs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_profiles" ADD CONSTRAINT "package_profiles_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_logistics" ADD CONSTRAINT "merchant_logistics_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_logistics" ADD CONSTRAINT "merchant_logistics_defaultPickupAddressId_fkey" FOREIGN KEY ("defaultPickupAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_logistics" ADD CONSTRAINT "merchant_logistics_defaultPackageProfileId_fkey" FOREIGN KEY ("defaultPackageProfileId") REFERENCES "package_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_pickup_addresses" ADD CONSTRAINT "merchant_store_pickup_addresses_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_pickup_addresses" ADD CONSTRAINT "merchant_store_pickup_addresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_package_profiles" ADD CONSTRAINT "merchant_store_package_profiles_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_package_profiles" ADD CONSTRAINT "merchant_store_package_profiles_packageProfileId_fkey" FOREIGN KEY ("packageProfileId") REFERENCES "package_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_services" ADD CONSTRAINT "courier_services_courierPartnerId_fkey" FOREIGN KEY ("courierPartnerId") REFERENCES "courier_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_courier_configs" ADD CONSTRAINT "merchant_courier_configs_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_courier_configs" ADD CONSTRAINT "merchant_courier_configs_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_courier_configs" ADD CONSTRAINT "merchant_store_courier_configs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_store_courier_configs" ADD CONSTRAINT "merchant_store_courier_configs_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_slots" ADD CONSTRAINT "pickup_slots_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_performance_metrics" ADD CONSTRAINT "courier_performance_metrics_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_performance_metrics" ADD CONSTRAINT "courier_performance_metrics_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_performance_metrics" ADD CONSTRAINT "courier_performance_metrics_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics" ADD CONSTRAINT "logistics_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics" ADD CONSTRAINT "logistics_bulkJobId_fkey" FOREIGN KEY ("bulkJobId") REFERENCES "bulk_logistics_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics" ADD CONSTRAINT "logistics_selectedCourierId_fkey" FOREIGN KEY ("selectedCourierId") REFERENCES "courier_quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics" ADD CONSTRAINT "logistics_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_logistics_jobs" ADD CONSTRAINT "bulk_logistics_jobs_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_logistics_jobs" ADD CONSTRAINT "bulk_logistics_jobs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_quotes" ADD CONSTRAINT "courier_quotes_logisticsId_fkey" FOREIGN KEY ("logisticsId") REFERENCES "logistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_quotes" ADD CONSTRAINT "courier_quotes_courierPartnerId_fkey" FOREIGN KEY ("courierPartnerId") REFERENCES "courier_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courier_quotes" ADD CONSTRAINT "courier_quotes_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_logisticsId_fkey" FOREIGN KEY ("logisticsId") REFERENCES "logistics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_selectedCourierQuoteId_fkey" FOREIGN KEY ("selectedCourierQuoteId") REFERENCES "courier_quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_verifications" ADD CONSTRAINT "delivery_verifications_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_documents" ADD CONSTRAINT "shipping_documents_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ndr_attempts" ADD CONSTRAINT "ndr_attempts_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifests" ADD CONSTRAINT "manifests_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifests" ADD CONSTRAINT "manifests_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifests" ADD CONSTRAINT "manifests_courierServiceId_fkey" FOREIGN KEY ("courierServiceId") REFERENCES "courier_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifests" ADD CONSTRAINT "manifests_pickupAddressId_fkey" FOREIGN KEY ("pickupAddressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifest_shipments" ADD CONSTRAINT "manifest_shipments_manifestId_fkey" FOREIGN KEY ("manifestId") REFERENCES "manifests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manifest_shipments" ADD CONSTRAINT "manifest_shipments_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_products" ADD CONSTRAINT "shop_products_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_products" ADD CONSTRAINT "shop_products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_product_variants" ADD CONSTRAINT "shop_product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "shop_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_carts" ADD CONSTRAINT "shop_carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_carts" ADD CONSTRAINT "shop_carts_guestSessionTokenId_fkey" FOREIGN KEY ("guestSessionTokenId") REFERENCES "guest_session_tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_cart_items" ADD CONSTRAINT "shop_cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "shop_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_cart_items" ADD CONSTRAINT "shop_cart_items_shopProductId_fkey" FOREIGN KEY ("shopProductId") REFERENCES "shop_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_cart_items" ADD CONSTRAINT "shop_cart_items_shopProductVariantId_fkey" FOREIGN KEY ("shopProductVariantId") REFERENCES "shop_product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order_groups" ADD CONSTRAINT "shop_order_groups_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order_groups" ADD CONSTRAINT "shop_order_groups_guestSessionTokenId_fkey" FOREIGN KEY ("guestSessionTokenId") REFERENCES "guest_session_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_guestSessionTokenId_fkey" FOREIGN KEY ("guestSessionTokenId") REFERENCES "guest_session_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_shopOrderGroupId_fkey" FOREIGN KEY ("shopOrderGroupId") REFERENCES "shop_order_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order_items" ADD CONSTRAINT "shop_order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order_items" ADD CONSTRAINT "shop_order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "shop_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order_items" ADD CONSTRAINT "shop_order_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "shop_product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_transactions" ADD CONSTRAINT "shop_transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_transactions" ADD CONSTRAINT "shop_transactions_releaseRequestedByGuestTokenId_fkey" FOREIGN KEY ("releaseRequestedByGuestTokenId") REFERENCES "guest_session_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_payments" ADD CONSTRAINT "shop_payments_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_payments" ADD CONSTRAINT "shop_payments_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_payments" ADD CONSTRAINT "shop_payments_guestSessionTokenId_fkey" FOREIGN KEY ("guestSessionTokenId") REFERENCES "guest_session_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_payments" ADD CONSTRAINT "shop_payments_orderGroupId_fkey" FOREIGN KEY ("orderGroupId") REFERENCES "shop_order_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return_requests" ADD CONSTRAINT "return_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return_requests" ADD CONSTRAINT "return_requests_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "shop_order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_dispute_tickets" ADD CONSTRAINT "shop_dispute_tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_dispute_tickets" ADD CONSTRAINT "shop_dispute_tickets_resolvedByAdminId_fkey" FOREIGN KEY ("resolvedByAdminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_refunds" ADD CONSTRAINT "shop_refunds_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "shop_dispute_tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_refunds" ADD CONSTRAINT "shop_refunds_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "shop_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_refunds" ADD CONSTRAINT "shop_refunds_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "shop_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_accounts" ADD CONSTRAINT "seller_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_deductions" ADD CONSTRAINT "seller_deductions_sellerAccountId_fkey" FOREIGN KEY ("sellerAccountId") REFERENCES "seller_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connects" ADD CONSTRAINT "connects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connects" ADD CONSTRAINT "connects_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connects" ADD CONSTRAINT "connects_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_attachments" ADD CONSTRAINT "order_attachments_orderDetailsId_fkey" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_tickets" ADD CONSTRAINT "dispute_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_tickets" ADD CONSTRAINT "dispute_tickets_resolvedByAdminId_fkey" FOREIGN KEY ("resolvedByAdminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_tickets" ADD CONSTRAINT "dispute_tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "dispute_tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "dispute_tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_accounts" ADD CONSTRAINT "merchant_accounts_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_deductions" ADD CONSTRAINT "merchant_deductions_merchantAccountId_fkey" FOREIGN KEY ("merchantAccountId") REFERENCES "merchant_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_deductions" ADD CONSTRAINT "merchant_deductions_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout_transactions" ADD CONSTRAINT "payout_transactions_merchantAccountId_fkey" FOREIGN KEY ("merchantAccountId") REFERENCES "merchant_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_platform_fees" ADD CONSTRAINT "merchant_platform_fees_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_platform_fees" ADD CONSTRAINT "store_platform_fees_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "merchant_stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "admin_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "admin_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
