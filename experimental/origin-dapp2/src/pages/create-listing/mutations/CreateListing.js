import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import get from 'lodash/get'

import CreateListingMutation from 'mutations/CreateListing'

import TransactionError from 'components/TransactionError'
import WaitForTransaction from 'components/WaitForTransaction'
import Redirect from 'components/Redirect'

import withCanTransact from 'hoc/withCanTransact'
import withWallet from 'hoc/withWallet'
import withWeb3 from 'hoc/withWeb3'

import Store from 'utils/store'
const store = Store('sessionStorage')

import applyListingData from './_listingData'

class CreateListing extends Component {
  state = {}
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} push />
    }
    return (
      <Mutation
        mutation={CreateListingMutation}
        onCompleted={({ createListing }) => {
          this.setState({ waitFor: createListing.id })
        }}
        onError={errorData =>
          this.setState({ waitFor: false, error: 'mutation', errorData })
        }
      >
        {createListing => (
          <>
            <button
              className={this.props.className}
              onClick={() => this.onClick(createListing)}
              children={this.props.children}
            />
            {this.renderWaitModal()}
            {this.state.error && (
              <TransactionError
                reason={this.state.error}
                data={this.state.errorData}
                onClose={() => this.setState({ error: false })}
              />
            )}
          </>
        )}
      </Mutation>
    )
  }

  onClick(createListing) {
    if (this.props.cannotTransact) {
      this.setState({
        error: this.props.cannotTransact,
        errorData: this.props.cannotTransactData
      })
      return
    }

    this.setState({ waitFor: 'pending' })

    const { listing, tokenBalance, wallet } = this.props

    const variables = applyListingData(this.props, {
      deposit: tokenBalance >= Number(listing.boost) ? listing.boost : '0',
      depositManager: wallet,
      from: wallet
    })

    createListing({ variables })
  }

  renderWaitModal() {
    if (!this.state.waitFor) return null
    const netId = get(this.props, 'web3.networkId')

    return (
      <WaitForTransaction hash={this.state.waitFor} event="ListingCreated">
        {({ event }) => (
          <div className="make-offer-modal">
            <div className="success-icon" />
            <div>Success!</div>
            <button
              href="#"
              className="btn btn-outline-light"
              onClick={() => {
                store.set('create-listing', undefined)
                const { listingID } = event.returnValues
                this.setState({ redirect: `/listings/${netId}-0-${listingID}` })
              }}
              children="View Listing"
            />
          </div>
        )}
      </WaitForTransaction>
    )
  }
}

export default withWeb3(withWallet(withCanTransact(CreateListing)))
