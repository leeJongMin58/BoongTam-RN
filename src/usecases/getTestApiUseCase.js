import * as repository from '../repositories/testRepository'

export const getTestApi = async () => (await repository.getTestApi())
