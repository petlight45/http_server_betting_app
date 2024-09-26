import express from "express";
import GameController from '../controllers/game';
import {filtersParserFromQueryParamsMiddleware} from "../middlewares/filters";
import GameFilterFields from "../controllers/filters/game";
import {permissionIsAuthenticatedMiddleware} from "../middlewares/permission";
import container from "../../infrastructure/container";


const router = express.Router()
const gameController = container.resolve<GameController>('gameController');
router.use(permissionIsAuthenticatedMiddleware,
    filtersParserFromQueryParamsMiddleware({
        filterFields: GameFilterFields.filter,
        searchFields: GameFilterFields.search,
        orderingFields: GameFilterFields.ordering,
        expansionFields: GameFilterFields.expansion
    }))
// @ts-ignore
router.get('/active', (req, res, next) => gameController.fetchActiveGames(req, res, next))
// @ts-ignore
router.get('/:id', (req, res, next) => gameController.fetchGame(req, res, next))
// @ts-ignore
router.get('/:id/events', (req, res, next) => gameController.fetchGameEvents(req, res, next))
router.get('/:id/bets', (req, res, next) => gameController.fetchGameBets(req, res, next))
// @ts-ignore
router.get('/', (req, res, next) => gameController.fetchGameMultiple(req, res, next))


export {router as GameRouter};