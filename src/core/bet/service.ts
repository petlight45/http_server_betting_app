import Bet, {BetParams} from "./index";
import {LoggerPort} from "../../ports/logger";
import {UserTransactionParams} from "../user/user_transaction";
import {UserTransactionTypeEnum} from "../user/user_transaction/enums";
import {BetStateEnum} from "./enums";
import container from "../../infrastructure/container";

type BetServiceParams = {
    betRepository: any;
    messageQueue: any
    appConfig: any
    logger: LoggerPort;
};

export default class BetService {
    private betRepository?: any;
    private messageQueue?: any;
    private appConfig?: any;
    private logger?: any;


    constructor(params: BetServiceParams) {
        this.betRepository = params.betRepository;
        this.messageQueue = params.messageQueue;
        this.appConfig = params.appConfig;
        this.logger = params.logger;
    }

    async createBet(data: BetParams): Promise<Bet> {
        const userTransactionService = container.resolve("userTransactionService")
        const bet = new Bet(data)
        return await this.betRepository.create(bet).then(async (bet: Bet) => {
            if (bet.state === BetStateEnum.PENDING) {
                const payload: UserTransactionParams = {
                    userId: bet.userId,
                    type: UserTransactionTypeEnum.DEBIT,
                    amount: bet.amount
                } as UserTransactionParams
                await userTransactionService.createUserTransaction(payload)
            }
        });
    }

    async fetchMultipleBets(filterParams?: any, sortParams?: any, expansionParams?: any): Promise<Bet[]> {
        return await this.betRepository.fetchMultiple(filterParams, sortParams, expansionParams);
    }

    async fetchSingleBet(id: string, filterParams?: any, expansionParams?: any): Promise<Bet> {
        return await this.betRepository.fetchSingle({_id: id, ...filterParams}, false, expansionParams);
    }

    async updateBet(id: string, data: any, filterParams?: any): Promise<Bet> {
        return await this.betRepository.update({_id: id, ...filterParams}, data);
    }

    async deleteBet(id: string, filterParams?: any) {
        return await this.betRepository.delete({_id: id, ...filterParams});
    }

    async winBet(id: string): Promise<void> {
        const userTransactionService = container.resolve("userTransactionService")
        const bet: Bet = await this.fetchSingleBet(id)
        if (bet.state === BetStateEnum.PENDING) {
            const payload: UserTransactionParams = {
                userId: bet.userId,
                type: UserTransactionTypeEnum.CREDIT,
                amount: bet.amount * bet.odds
            } as UserTransactionParams
            await userTransactionService.createUserTransaction(payload)
            await this.updateBet(id, {
                state: BetStateEnum.WIN
            })
        }
    }

    async loseBet(id: string): Promise<void> {
        const bet: Bet = await this.fetchSingleBet(id)
        if (bet.state === BetStateEnum.PENDING) {
            await this.updateBet(id, {
                state: BetStateEnum.WIN
            })
        }
    }
}