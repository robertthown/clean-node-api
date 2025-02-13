import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository {
    private collection: Collection

    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const account = await accountCollection.findOne({ _id: result.insertedId })
        return MongoHelper.map(account)
    }
}