
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  pseudo: 'pseudo',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.VipSubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  stripeSubscriptionId: 'stripeSubscriptionId',
  stripeCustomerId: 'stripeCustomerId',
  plan: 'plan',
  startDate: 'startDate',
  endDate: 'endDate',
  cancelledAt: 'cancelledAt',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt'
};

exports.Prisma.AvatarScalarFieldEnum = {
  id: 'id',
  url: 'url',
  shapeId: 'shapeId',
  eyesId: 'eyesId',
  mouthId: 'mouthId',
  patternId: 'patternId',
  colorShapeId: 'colorShapeId',
  colorPatternId: 'colorPatternId',
  userId: 'userId'
};

exports.Prisma.ColorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  gradientValue: 'gradientValue',
  level: 'level',
  vip: 'vip'
};

exports.Prisma.AvatarAssetScalarFieldEnum = {
  id: 'id',
  type: 'type',
  name: 'name',
  url: 'url',
  level: 'level',
  vipOnly: 'vipOnly'
};

exports.Prisma.FriendScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  friendId: 'friendId',
  status: 'status',
  createdAt: 'createdAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.UserStatsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  xp: 'xp',
  level: 'level',
  streak: 'streak',
  lastPlayedAt: 'lastPlayedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserEventScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  createdAt: 'createdAt',
  avatarAssetId: 'avatarAssetId',
  friendId: 'friendId',
  gameResultId: 'gameResultId',
  levelUp: 'levelUp',
  attempts: 'attempts'
};

exports.Prisma.GameResultScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  gameId: 'gameId',
  score: 'score',
  xpGained: 'xpGained',
  status: 'status',
  date: 'date',
  deletedAt: 'deletedAt'
};

exports.Prisma.GameScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  imgUrl: 'imgUrl',
  path: 'path',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  gameCategoryId: 'gameCategoryId',
  status: 'status'
};

exports.Prisma.GameCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  color: 'color'
};

exports.Prisma.DataMovieScalarFieldEnum = {
  id: 'id',
  tmdbId: 'tmdbId',
  title: 'title',
  originalTitle: 'originalTitle',
  year: 'year',
  releaseDate: 'releaseDate',
  runtime: 'runtime',
  director: 'director',
  actors: 'actors',
  genres: 'genres',
  synopsis: 'synopsis',
  production: 'production',
  country: 'country',
  language: 'language',
  voteAverage: 'voteAverage',
  voteCount: 'voteCount',
  popularity: 'popularity',
  budget: 'budget',
  keywords: 'keywords',
  posterPath: 'posterPath',
  backdropPath: 'backdropPath',
  image1: 'image1',
  image2: 'image2',
  image3: 'image3',
  image4: 'image4',
  image5: 'image5',
  image6: 'image6',
  image7: 'image7',
  image8: 'image8',
  image9: 'image9',
  image10: 'image10',
  createdAt: 'createdAt'
};

exports.Prisma.GameCinema1DaysScalarFieldEnum = {
  id: 'id',
  date: 'date',
  movieId: 'movieId',
  createdAt: 'createdAt'
};

exports.Prisma.GameCinema1TriesScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dayId: 'dayId',
  guess: 'guess',
  correct: 'correct',
  createdAt: 'createdAt'
};

exports.Prisma.GameCinema2DaysScalarFieldEnum = {
  id: 'id',
  date: 'date',
  movieId: 'movieId',
  createdAt: 'createdAt'
};

exports.Prisma.GameCinema2TriesScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dayId: 'dayId',
  guess: 'guess',
  correct: 'correct',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.VipPlan = exports.$Enums.VipPlan = {
  monthly: 'monthly',
  yearly: 'yearly'
};

exports.VipStatus = exports.$Enums.VipStatus = {
  active: 'active',
  cancelled: 'cancelled',
  expired: 'expired'
};

exports.Prisma.ModelName = {
  User: 'User',
  VipSubscription: 'VipSubscription',
  PasswordResetToken: 'PasswordResetToken',
  Avatar: 'Avatar',
  Color: 'Color',
  AvatarAsset: 'AvatarAsset',
  Friend: 'Friend',
  UserStats: 'UserStats',
  UserEvent: 'UserEvent',
  GameResult: 'GameResult',
  Game: 'Game',
  GameCategory: 'GameCategory',
  DataMovie: 'DataMovie',
  GameCinema1Days: 'GameCinema1Days',
  GameCinema1Tries: 'GameCinema1Tries',
  GameCinema2Days: 'GameCinema2Days',
  GameCinema2Tries: 'GameCinema2Tries'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
