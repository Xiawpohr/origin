import React from 'react'
import Link from 'components/Link'
import Steps from 'components/Steps'

import ListingPreview from './_ListingPreview'
import HelpWallet from './_HelpWallet'

const Step1 = ({ listing }) => (
  <>
    <div className="step">Step 1</div>
    <h3>Connect a Crypto Wallet</h3>
    <div className="row">
      <div className="col-md-8">
        <Steps steps={4} step={1} />
        <div className="connect mobile-wallet">
          <div className="image">
            <div />
          </div>
          <div>
            <h4>Origin Mobile Wallet</h4>
            <div className="description">
              Origin’s Mobile Wallet will allow you to store crypto currency so
              you can buy and sell on our DApp.
            </div>
            <div className="note">Currently only available for iOS</div>
            <button className="btn btn-outline-primary">
              Connect Origin Wallet
            </button>
          </div>
        </div>
        <div className="connect metamask">
          <div className="image">
            <div />
          </div>
          <div>
            <h4>MetaMask</h4>
            <div className="description">
              MetaMask is a browser extension for Chrome that will allow you to
              access the decentralized web.
            </div>
            <div className="note">Available for Google Chrome</div>
            <Link
              to={`/listings/${listing.id}/onboard/metamask`}
              className="btn btn-outline-primary"
            >
              Connect MetaMask
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <ListingPreview listing={listing} />
        <HelpWallet />
      </div>
    </div>
  </>
)

export default Step1

require('react-styl')(`
  .onboard
    .connect
      border: 1px solid var(--light)
      border-radius: var(--default-radius)
      padding: 2rem
      margin-bottom: 1.5rem
      display: flex
      .image
        margin-right: 2rem
        > div
          width: 105px
          height: 105px
      &.mobile-wallet .image > div
        background: url(images/origin-icon-white.svg) no-repeat center
        background-size: 4rem
        background-color: var(--clear-blue)
        border-radius: 18px
      &.metamask .image > div
        background: url(images/metamask.svg) no-repeat center
        background-size: 6rem
      h4
        font-family: var(--heading-font)
        font-size: 24px
        font-weight: 300
      .note
        margin: 0.5rem 0 1.5rem
        font-style: italic
      .btn
        padding: 0.75rem 2rem
        border-radius: 2rem

`)
