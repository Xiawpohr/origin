// Insert data in the DB for testing purposes.
const BigNumber = require('bignumber.js')

const db = require('../models')
const enums = require('../enums')

// Accounts generated using Truffle default mnemonic:
// "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
// Token supplier. Account 1.
// const account1 = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'.toLowerCase()

// User. Account 2.
const account2 = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'.toLowerCase()

function tokenNaturalUnits(x) {
  return BigNumber(x)
    .times(BigNumber(10).pow(18))
    .toFixed()
}

const rule = {
  numLevels: 3,
  levels: {
    0: {
      rules: [
        {
          id: 'PreRequisite',
          class: 'MultiEvents',
          config: {
            eventTypes: ['ProfilePublished', 'EmailAttestationPublished'],
            numEventsRequired: 2,
            reward: null,
            nextLevelCondition: true
          }
        }
      ]
    },
    1: {
      rules: [
        {
          id: 'PhoneAttestation',
          class: 'SingleEvent',
          config: {
            eventType: 'PhoneAttestationPublished',
            reward: {
              amount: tokenNaturalUnits(10),
              currency: 'OGN'
            },
            limit: 1,
            nextLevelCondition: false
          }
        },
        {
          id: 'FacebookAttestation',
          class: 'SingleEvent',
          config: {
            eventType: 'FacebookAttestationPublished',
            reward: {
              amount: tokenNaturalUnits(10),
              currency: 'OGN'
            },
            limit: 1,
            nextLevelCondition: false
          }
        },
        {
          id: 'AirbnbAttestation',
          class: 'SingleEvent',
          config: {
            eventType: 'AirbnbAttestationPublished',
            reward: {
              amount: tokenNaturalUnits(10),
              currency: 'OGN'
            },
            limit: 1,
            nextLevelCondition: false
          }
        },
        {
          id: 'TwitterAttestation',
          class: 'SingleEvent',
          config: {
            eventType: 'TwitterAttestationPublished',
            reward: {
              amount: tokenNaturalUnits(10),
              currency: 'OGN'
            },
            limit: 1,
            nextLevelCondition: false
          }
        },
        {
          id: 'TwoAttestations',
          class: 'MultiEvents',
          config: {
            eventTypes: [
              'PhoneAttestationPublished',
              'FacebookAttestationPublished',
              'AirbnbAttestationPublished',
              'TwitterAttestationPublished'
            ],
            numEventsRequired: 2,
            reward: null,
            nextLevelCondition: true
          }
        }
      ]
    },
    2: {
      rules: [
        {
          id: 'Referral',
          class: 'SingleEvent',
          config: {
            eventType: 'RefereeSignedUp',
            reward: {
              amount: tokenNaturalUnits(10),
              currency: 'OGN'
            },
            limit: 100,
            nextLevelCondition: false
          }
        },
        {
          id: 'ListingCreation',
          class: 'SingleEvent',
          config: {
            eventType: 'ListingCreated',
            reward: {
              amount: tokenNaturalUnits(5),
              currency: 'OGN'
            },
            limit: 10,
            nextLevelCondition: false
          }
        },
        {
          id: 'ListingPurchase',
          class: 'SingleEvent',
          config: {
            eventType: 'ListingPurchased',
            reward: {
              amount: tokenNaturalUnits(5),
              currency: 'OGN'
            },
            limit: 10,
            nextLevelCondition: false
          }
        }
      ]
    }
  }
}

async function createTestData() {
  //
  // Campaigns
  //
  console.log('Creating test campaign data...')

  await db.GrowthCampaign.destroy({
    where: {},
    truncate: true
  })

  await db.GrowthCampaign.upsert({
    id: 1,
    name: 'JAN 2019',
    rules: JSON.stringify(rule),
    startDate: Date.parse('January 1, 2019'),
    endDate: Date.parse('January 28, 2019'),
    distributionDate: Date.parse('February 1, 2019'),
    cap: 10000 * Math.pow(10, 18),
    capUsed: 0,
    currency: 'OGN',
    rewardStatus: enums.GrowthCampaignRewardStatuses.NotReady
  })

  await db.GrowthCampaign.upsert({
    id: 2,
    name: 'FEB 2019',
    rules: JSON.stringify(rule),
    startDate: Date.parse('February 1, 2019'),
    endDate: Date.parse('February 28, 2019'),
    distributionDate: Date.parse('March 28, 2019'),
    cap: 10000 * Math.pow(10, 18),
    capUsed: 0,
    currency: 'OGN',
    rewardStatus: enums.GrowthCampaignRewardStatuses.NotReady
  })

  await db.GrowthCampaign.upsert({
    id: 3,
    name: 'MAR 2019',
    rules: JSON.stringify(rule),
    startDate: Date.parse('March 1, 2019'),
    endDate: Date.parse('March 31, 2019'),
    distributionDate: Date.parse('April 28, 2019'),
    cap: 10000 * Math.pow(10, 18),
    capUsed: 0,
    currency: 'OGN',
    rewardStatus: enums.GrowthCampaignRewardStatuses.NotReady
  })

  await db.GrowthCampaign.upsert({
    id: 4,
    name: 'APR 2019',
    rules: JSON.stringify(rule),
    startDate: Date.parse('April 1, 2019'),
    endDate: Date.parse('April 30, 2019'),
    distributionDate: Date.parse('May 28, 2019'),
    cap: 10000 * Math.pow(10, 18),
    capUsed: 0,
    currency: 'OGN',
    rewardStatus: enums.GrowthCampaignRewardStatuses.NotReady
  })

  //
  // Participants
  //
  console.log('Creating test participant data...')

  await db.GrowthParticipant.destroy({
    where: {},
    truncate: true
  })

  await db.GrowthParticipant.upsert({
    ethAddress: account2,
    status: enums.GrowthParticipantStatuses.Active,
    data: null,
    agreementId: 'Test agreement'
  })
  await db.GrowthParticipant.update(
    { createdAt: Date.parse('January 1, 2019') },
    { where: { ethAddress: account2 } }
  )

  await db.GrowthParticipant.upsert({
    ethAddress: account2,
    status: enums.GrowthParticipantStatuses.Active,
    data: null,
    agreementId: 'Test agreement'
  })
  await db.GrowthParticipant.update(
    { createdAt: Date.parse('January 1, 2019') },
    { where: { ethAddress: account2 } }
  )

  //
  // Events
  //
  console.log('Creating test event data...')

  await db.GrowthEvent.destroy({
    where: {},
    truncate: true
  })

  await db.GrowthEvent.upsert({
    id: 1,
    customId: null,
    type: enums.GrowthEventTypes.ProfilePublished,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 2, 2019') },
    { where: { id: 1 } }
  )

  await db.GrowthEvent.upsert({
    id: 2,
    customId: null,
    type: enums.GrowthEventTypes.EmailAttestationPublished,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 2, 2019') },
    { where: { id: 2 } }
  )

  await db.GrowthEvent.upsert({
    id: 3,
    customId: null,
    type: enums.GrowthEventTypes.AirbnbAttestationPublished,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 3, 2019') },
    { where: { id: 3 } }
  )

  await db.GrowthEvent.upsert({
    id: 4,
    customId: null,
    type: enums.GrowthEventTypes.TwitterAttestationPublished,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 3, 2019') },
    { where: { id: 4 } }
  )

  await db.GrowthEvent.upsert({
    id: 5,
    customId: null,
    type: enums.GrowthEventTypes.RefereeSignedUp,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 4, 2019') },
    { where: { id: 5 } }
  )

  await db.GrowthEvent.upsert({
    id: 6,
    customId: '1-000-456',
    type: enums.GrowthEventTypes.ListingCreated,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 5, 2019') },
    { where: { id: 6 } }
  )

  await db.GrowthEvent.upsert({
    id: 7,
    customId: '1-000-789-1',
    type: enums.GrowthEventTypes.ListingPurchased,
    status: enums.GrowthEventStatuses.Logged,
    ethAddress: account2,
    data: null
  })
  await db.GrowthEvent.update(
    { createdAt: Date.parse('January 6, 2019') },
    { where: { id: 7 } }
  )

  // Wipe out any previous rewards.
  await db.GrowthReward.destroy({
    where: {},
    truncate: true
  })
}

createTestData().then(() => {
  console.log('Done')
  process.exit()
})
