
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Avatar
 * 
 */
export type Avatar = $Result.DefaultSelection<Prisma.$AvatarPayload>
/**
 * Model Color
 * 
 */
export type Color = $Result.DefaultSelection<Prisma.$ColorPayload>
/**
 * Model AvatarAsset
 * 
 */
export type AvatarAsset = $Result.DefaultSelection<Prisma.$AvatarAssetPayload>
/**
 * Model Friend
 * 
 */
export type Friend = $Result.DefaultSelection<Prisma.$FriendPayload>
/**
 * Model UserStats
 * 
 */
export type UserStats = $Result.DefaultSelection<Prisma.$UserStatsPayload>
/**
 * Model UserEvent
 * 
 */
export type UserEvent = $Result.DefaultSelection<Prisma.$UserEventPayload>
/**
 * Model GameResult
 * 
 */
export type GameResult = $Result.DefaultSelection<Prisma.$GameResultPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GameCategory
 * 
 */
export type GameCategory = $Result.DefaultSelection<Prisma.$GameCategoryPayload>
/**
 * Model DataMovie
 * 
 */
export type DataMovie = $Result.DefaultSelection<Prisma.$DataMoviePayload>
/**
 * Model GameCinema1Days
 * 
 */
export type GameCinema1Days = $Result.DefaultSelection<Prisma.$GameCinema1DaysPayload>
/**
 * Model GameCinema1Tries
 * 
 */
export type GameCinema1Tries = $Result.DefaultSelection<Prisma.$GameCinema1TriesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.avatar`: Exposes CRUD operations for the **Avatar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Avatars
    * const avatars = await prisma.avatar.findMany()
    * ```
    */
  get avatar(): Prisma.AvatarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.color`: Exposes CRUD operations for the **Color** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colors
    * const colors = await prisma.color.findMany()
    * ```
    */
  get color(): Prisma.ColorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.avatarAsset`: Exposes CRUD operations for the **AvatarAsset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvatarAssets
    * const avatarAssets = await prisma.avatarAsset.findMany()
    * ```
    */
  get avatarAsset(): Prisma.AvatarAssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friend`: Exposes CRUD operations for the **Friend** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friends
    * const friends = await prisma.friend.findMany()
    * ```
    */
  get friend(): Prisma.FriendDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userStats`: Exposes CRUD operations for the **UserStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStats
    * const userStats = await prisma.userStats.findMany()
    * ```
    */
  get userStats(): Prisma.UserStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userEvent`: Exposes CRUD operations for the **UserEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserEvents
    * const userEvents = await prisma.userEvent.findMany()
    * ```
    */
  get userEvent(): Prisma.UserEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameResult`: Exposes CRUD operations for the **GameResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameResults
    * const gameResults = await prisma.gameResult.findMany()
    * ```
    */
  get gameResult(): Prisma.GameResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameCategory`: Exposes CRUD operations for the **GameCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameCategories
    * const gameCategories = await prisma.gameCategory.findMany()
    * ```
    */
  get gameCategory(): Prisma.GameCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataMovie`: Exposes CRUD operations for the **DataMovie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataMovies
    * const dataMovies = await prisma.dataMovie.findMany()
    * ```
    */
  get dataMovie(): Prisma.DataMovieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameCinema1Days`: Exposes CRUD operations for the **GameCinema1Days** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameCinema1Days
    * const gameCinema1Days = await prisma.gameCinema1Days.findMany()
    * ```
    */
  get gameCinema1Days(): Prisma.GameCinema1DaysDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameCinema1Tries`: Exposes CRUD operations for the **GameCinema1Tries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameCinema1Tries
    * const gameCinema1Tries = await prisma.gameCinema1Tries.findMany()
    * ```
    */
  get gameCinema1Tries(): Prisma.GameCinema1TriesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
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
    GameCinema1Tries: 'GameCinema1Tries'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "avatar" | "color" | "avatarAsset" | "friend" | "userStats" | "userEvent" | "gameResult" | "game" | "gameCategory" | "dataMovie" | "gameCinema1Days" | "gameCinema1Tries"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Avatar: {
        payload: Prisma.$AvatarPayload<ExtArgs>
        fields: Prisma.AvatarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvatarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvatarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findFirst: {
            args: Prisma.AvatarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvatarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findMany: {
            args: Prisma.AvatarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          create: {
            args: Prisma.AvatarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          createMany: {
            args: Prisma.AvatarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvatarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          delete: {
            args: Prisma.AvatarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          update: {
            args: Prisma.AvatarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          deleteMany: {
            args: Prisma.AvatarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvatarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvatarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          upsert: {
            args: Prisma.AvatarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          aggregate: {
            args: Prisma.AvatarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvatar>
          }
          groupBy: {
            args: Prisma.AvatarGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvatarGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvatarCountArgs<ExtArgs>
            result: $Utils.Optional<AvatarCountAggregateOutputType> | number
          }
        }
      }
      Color: {
        payload: Prisma.$ColorPayload<ExtArgs>
        fields: Prisma.ColorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          findFirst: {
            args: Prisma.ColorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          findMany: {
            args: Prisma.ColorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          create: {
            args: Prisma.ColorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          createMany: {
            args: Prisma.ColorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          delete: {
            args: Prisma.ColorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          update: {
            args: Prisma.ColorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          deleteMany: {
            args: Prisma.ColorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>[]
          }
          upsert: {
            args: Prisma.ColorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColorPayload>
          }
          aggregate: {
            args: Prisma.ColorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColor>
          }
          groupBy: {
            args: Prisma.ColorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColorCountArgs<ExtArgs>
            result: $Utils.Optional<ColorCountAggregateOutputType> | number
          }
        }
      }
      AvatarAsset: {
        payload: Prisma.$AvatarAssetPayload<ExtArgs>
        fields: Prisma.AvatarAssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvatarAssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvatarAssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          findFirst: {
            args: Prisma.AvatarAssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvatarAssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          findMany: {
            args: Prisma.AvatarAssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>[]
          }
          create: {
            args: Prisma.AvatarAssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          createMany: {
            args: Prisma.AvatarAssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvatarAssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>[]
          }
          delete: {
            args: Prisma.AvatarAssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          update: {
            args: Prisma.AvatarAssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          deleteMany: {
            args: Prisma.AvatarAssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvatarAssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvatarAssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>[]
          }
          upsert: {
            args: Prisma.AvatarAssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarAssetPayload>
          }
          aggregate: {
            args: Prisma.AvatarAssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvatarAsset>
          }
          groupBy: {
            args: Prisma.AvatarAssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvatarAssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvatarAssetCountArgs<ExtArgs>
            result: $Utils.Optional<AvatarAssetCountAggregateOutputType> | number
          }
        }
      }
      Friend: {
        payload: Prisma.$FriendPayload<ExtArgs>
        fields: Prisma.FriendFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findFirst: {
            args: Prisma.FriendFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findMany: {
            args: Prisma.FriendFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          create: {
            args: Prisma.FriendCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          createMany: {
            args: Prisma.FriendCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          delete: {
            args: Prisma.FriendDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          update: {
            args: Prisma.FriendUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          deleteMany: {
            args: Prisma.FriendDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          upsert: {
            args: Prisma.FriendUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          aggregate: {
            args: Prisma.FriendAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriend>
          }
          groupBy: {
            args: Prisma.FriendGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendCountArgs<ExtArgs>
            result: $Utils.Optional<FriendCountAggregateOutputType> | number
          }
        }
      }
      UserStats: {
        payload: Prisma.$UserStatsPayload<ExtArgs>
        fields: Prisma.UserStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findFirst: {
            args: Prisma.UserStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findMany: {
            args: Prisma.UserStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          create: {
            args: Prisma.UserStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          createMany: {
            args: Prisma.UserStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          delete: {
            args: Prisma.UserStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          update: {
            args: Prisma.UserStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          upsert: {
            args: Prisma.UserStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          aggregate: {
            args: Prisma.UserStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStats>
          }
          groupBy: {
            args: Prisma.UserStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserStatsCountAggregateOutputType> | number
          }
        }
      }
      UserEvent: {
        payload: Prisma.$UserEventPayload<ExtArgs>
        fields: Prisma.UserEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          findFirst: {
            args: Prisma.UserEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          findMany: {
            args: Prisma.UserEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          create: {
            args: Prisma.UserEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          createMany: {
            args: Prisma.UserEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          delete: {
            args: Prisma.UserEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          update: {
            args: Prisma.UserEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          deleteMany: {
            args: Prisma.UserEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          upsert: {
            args: Prisma.UserEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          aggregate: {
            args: Prisma.UserEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserEvent>
          }
          groupBy: {
            args: Prisma.UserEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserEventCountArgs<ExtArgs>
            result: $Utils.Optional<UserEventCountAggregateOutputType> | number
          }
        }
      }
      GameResult: {
        payload: Prisma.$GameResultPayload<ExtArgs>
        fields: Prisma.GameResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          findFirst: {
            args: Prisma.GameResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          findMany: {
            args: Prisma.GameResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>[]
          }
          create: {
            args: Prisma.GameResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          createMany: {
            args: Prisma.GameResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>[]
          }
          delete: {
            args: Prisma.GameResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          update: {
            args: Prisma.GameResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          deleteMany: {
            args: Prisma.GameResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>[]
          }
          upsert: {
            args: Prisma.GameResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameResultPayload>
          }
          aggregate: {
            args: Prisma.GameResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameResult>
          }
          groupBy: {
            args: Prisma.GameResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameResultCountArgs<ExtArgs>
            result: $Utils.Optional<GameResultCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GameCategory: {
        payload: Prisma.$GameCategoryPayload<ExtArgs>
        fields: Prisma.GameCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          findFirst: {
            args: Prisma.GameCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          findMany: {
            args: Prisma.GameCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>[]
          }
          create: {
            args: Prisma.GameCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          createMany: {
            args: Prisma.GameCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>[]
          }
          delete: {
            args: Prisma.GameCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          update: {
            args: Prisma.GameCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          deleteMany: {
            args: Prisma.GameCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>[]
          }
          upsert: {
            args: Prisma.GameCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCategoryPayload>
          }
          aggregate: {
            args: Prisma.GameCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameCategory>
          }
          groupBy: {
            args: Prisma.GameCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<GameCategoryCountAggregateOutputType> | number
          }
        }
      }
      DataMovie: {
        payload: Prisma.$DataMoviePayload<ExtArgs>
        fields: Prisma.DataMovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataMovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataMovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          findFirst: {
            args: Prisma.DataMovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataMovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          findMany: {
            args: Prisma.DataMovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>[]
          }
          create: {
            args: Prisma.DataMovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          createMany: {
            args: Prisma.DataMovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataMovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>[]
          }
          delete: {
            args: Prisma.DataMovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          update: {
            args: Prisma.DataMovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          deleteMany: {
            args: Prisma.DataMovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataMovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataMovieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>[]
          }
          upsert: {
            args: Prisma.DataMovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMoviePayload>
          }
          aggregate: {
            args: Prisma.DataMovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataMovie>
          }
          groupBy: {
            args: Prisma.DataMovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataMovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataMovieCountArgs<ExtArgs>
            result: $Utils.Optional<DataMovieCountAggregateOutputType> | number
          }
        }
      }
      GameCinema1Days: {
        payload: Prisma.$GameCinema1DaysPayload<ExtArgs>
        fields: Prisma.GameCinema1DaysFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameCinema1DaysFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameCinema1DaysFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          findFirst: {
            args: Prisma.GameCinema1DaysFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameCinema1DaysFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          findMany: {
            args: Prisma.GameCinema1DaysFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>[]
          }
          create: {
            args: Prisma.GameCinema1DaysCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          createMany: {
            args: Prisma.GameCinema1DaysCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCinema1DaysCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>[]
          }
          delete: {
            args: Prisma.GameCinema1DaysDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          update: {
            args: Prisma.GameCinema1DaysUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          deleteMany: {
            args: Prisma.GameCinema1DaysDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameCinema1DaysUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameCinema1DaysUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>[]
          }
          upsert: {
            args: Prisma.GameCinema1DaysUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1DaysPayload>
          }
          aggregate: {
            args: Prisma.GameCinema1DaysAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameCinema1Days>
          }
          groupBy: {
            args: Prisma.GameCinema1DaysGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameCinema1DaysGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCinema1DaysCountArgs<ExtArgs>
            result: $Utils.Optional<GameCinema1DaysCountAggregateOutputType> | number
          }
        }
      }
      GameCinema1Tries: {
        payload: Prisma.$GameCinema1TriesPayload<ExtArgs>
        fields: Prisma.GameCinema1TriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameCinema1TriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameCinema1TriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          findFirst: {
            args: Prisma.GameCinema1TriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameCinema1TriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          findMany: {
            args: Prisma.GameCinema1TriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>[]
          }
          create: {
            args: Prisma.GameCinema1TriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          createMany: {
            args: Prisma.GameCinema1TriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCinema1TriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>[]
          }
          delete: {
            args: Prisma.GameCinema1TriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          update: {
            args: Prisma.GameCinema1TriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          deleteMany: {
            args: Prisma.GameCinema1TriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameCinema1TriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameCinema1TriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>[]
          }
          upsert: {
            args: Prisma.GameCinema1TriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameCinema1TriesPayload>
          }
          aggregate: {
            args: Prisma.GameCinema1TriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameCinema1Tries>
          }
          groupBy: {
            args: Prisma.GameCinema1TriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameCinema1TriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCinema1TriesCountArgs<ExtArgs>
            result: $Utils.Optional<GameCinema1TriesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    avatar?: AvatarOmit
    color?: ColorOmit
    avatarAsset?: AvatarAssetOmit
    friend?: FriendOmit
    userStats?: UserStatsOmit
    userEvent?: UserEventOmit
    gameResult?: GameResultOmit
    game?: GameOmit
    gameCategory?: GameCategoryOmit
    dataMovie?: DataMovieOmit
    gameCinema1Days?: GameCinema1DaysOmit
    gameCinema1Tries?: GameCinema1TriesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friends: number
    friend: number
    userEvents: number
    gameResults: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friends?: boolean | UserCountOutputTypeCountFriendsArgs
    friend?: boolean | UserCountOutputTypeCountFriendArgs
    userEvents?: boolean | UserCountOutputTypeCountUserEventsArgs
    gameResults?: boolean | UserCountOutputTypeCountGameResultsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameResultWhereInput
  }


  /**
   * Count Type ColorCountOutputType
   */

  export type ColorCountOutputType = {
    colorShape: number
    colorPattern: number
  }

  export type ColorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colorShape?: boolean | ColorCountOutputTypeCountColorShapeArgs
    colorPattern?: boolean | ColorCountOutputTypeCountColorPatternArgs
  }

  // Custom InputTypes
  /**
   * ColorCountOutputType without action
   */
  export type ColorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColorCountOutputType
     */
    select?: ColorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColorCountOutputType without action
   */
  export type ColorCountOutputTypeCountColorShapeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }

  /**
   * ColorCountOutputType without action
   */
  export type ColorCountOutputTypeCountColorPatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }


  /**
   * Count Type AvatarAssetCountOutputType
   */

  export type AvatarAssetCountOutputType = {
    shapes: number
    eyes: number
    mouths: number
    patterns: number
    userEvents: number
  }

  export type AvatarAssetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shapes?: boolean | AvatarAssetCountOutputTypeCountShapesArgs
    eyes?: boolean | AvatarAssetCountOutputTypeCountEyesArgs
    mouths?: boolean | AvatarAssetCountOutputTypeCountMouthsArgs
    patterns?: boolean | AvatarAssetCountOutputTypeCountPatternsArgs
    userEvents?: boolean | AvatarAssetCountOutputTypeCountUserEventsArgs
  }

  // Custom InputTypes
  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAssetCountOutputType
     */
    select?: AvatarAssetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeCountShapesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }

  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeCountEyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }

  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeCountMouthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }

  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeCountPatternsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
  }

  /**
   * AvatarAssetCountOutputType without action
   */
  export type AvatarAssetCountOutputTypeCountUserEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }


  /**
   * Count Type FriendCountOutputType
   */

  export type FriendCountOutputType = {
    userEvents: number
  }

  export type FriendCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userEvents?: boolean | FriendCountOutputTypeCountUserEventsArgs
  }

  // Custom InputTypes
  /**
   * FriendCountOutputType without action
   */
  export type FriendCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendCountOutputType
     */
    select?: FriendCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FriendCountOutputType without action
   */
  export type FriendCountOutputTypeCountUserEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }


  /**
   * Count Type GameResultCountOutputType
   */

  export type GameResultCountOutputType = {
    userEvents: number
  }

  export type GameResultCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userEvents?: boolean | GameResultCountOutputTypeCountUserEventsArgs
  }

  // Custom InputTypes
  /**
   * GameResultCountOutputType without action
   */
  export type GameResultCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResultCountOutputType
     */
    select?: GameResultCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameResultCountOutputType without action
   */
  export type GameResultCountOutputTypeCountUserEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    results: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | GameCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameResultWhereInput
  }


  /**
   * Count Type GameCategoryCountOutputType
   */

  export type GameCategoryCountOutputType = {
    games: number
  }

  export type GameCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | GameCategoryCountOutputTypeCountGamesArgs
  }

  // Custom InputTypes
  /**
   * GameCategoryCountOutputType without action
   */
  export type GameCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategoryCountOutputType
     */
    select?: GameCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCategoryCountOutputType without action
   */
  export type GameCategoryCountOutputTypeCountGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Count Type DataMovieCountOutputType
   */

  export type DataMovieCountOutputType = {
    gameDays: number
  }

  export type DataMovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameDays?: boolean | DataMovieCountOutputTypeCountGameDaysArgs
  }

  // Custom InputTypes
  /**
   * DataMovieCountOutputType without action
   */
  export type DataMovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovieCountOutputType
     */
    select?: DataMovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DataMovieCountOutputType without action
   */
  export type DataMovieCountOutputTypeCountGameDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameCinema1DaysWhereInput
  }


  /**
   * Count Type GameCinema1DaysCountOutputType
   */

  export type GameCinema1DaysCountOutputType = {
    tries: number
  }

  export type GameCinema1DaysCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tries?: boolean | GameCinema1DaysCountOutputTypeCountTriesArgs
  }

  // Custom InputTypes
  /**
   * GameCinema1DaysCountOutputType without action
   */
  export type GameCinema1DaysCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1DaysCountOutputType
     */
    select?: GameCinema1DaysCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCinema1DaysCountOutputType without action
   */
  export type GameCinema1DaysCountOutputTypeCountTriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameCinema1TriesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    pseudo: string | null
    firstName: string | null
    lastName: string | null
    birthdate: Date | null
    isVip: boolean | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    pseudo: string | null
    firstName: string | null
    lastName: string | null
    birthdate: Date | null
    isVip: boolean | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    pseudo: number
    firstName: number
    lastName: number
    birthdate: number
    isVip: number
    role: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    pseudo?: true
    firstName?: true
    lastName?: true
    birthdate?: true
    isVip?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    pseudo?: true
    firstName?: true
    lastName?: true
    birthdate?: true
    isVip?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    pseudo?: true
    firstName?: true
    lastName?: true
    birthdate?: true
    isVip?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    pseudo: string
    firstName: string | null
    lastName: string | null
    birthdate: Date | null
    isVip: boolean
    role: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    pseudo?: boolean
    firstName?: boolean
    lastName?: boolean
    birthdate?: boolean
    isVip?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    avatar?: boolean | User$avatarArgs<ExtArgs>
    friends?: boolean | User$friendsArgs<ExtArgs>
    friend?: boolean | User$friendArgs<ExtArgs>
    userStats?: boolean | User$userStatsArgs<ExtArgs>
    userEvents?: boolean | User$userEventsArgs<ExtArgs>
    gameResults?: boolean | User$gameResultsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    pseudo?: boolean
    firstName?: boolean
    lastName?: boolean
    birthdate?: boolean
    isVip?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    pseudo?: boolean
    firstName?: boolean
    lastName?: boolean
    birthdate?: boolean
    isVip?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    pseudo?: boolean
    firstName?: boolean
    lastName?: boolean
    birthdate?: boolean
    isVip?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "pseudo" | "firstName" | "lastName" | "birthdate" | "isVip" | "role" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | User$avatarArgs<ExtArgs>
    friends?: boolean | User$friendsArgs<ExtArgs>
    friend?: boolean | User$friendArgs<ExtArgs>
    userStats?: boolean | User$userStatsArgs<ExtArgs>
    userEvents?: boolean | User$userEventsArgs<ExtArgs>
    gameResults?: boolean | User$gameResultsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      avatar: Prisma.$AvatarPayload<ExtArgs> | null
      friends: Prisma.$FriendPayload<ExtArgs>[]
      friend: Prisma.$FriendPayload<ExtArgs>[]
      userStats: Prisma.$UserStatsPayload<ExtArgs> | null
      userEvents: Prisma.$UserEventPayload<ExtArgs>[]
      gameResults: Prisma.$GameResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      pseudo: string
      firstName: string | null
      lastName: string | null
      birthdate: Date | null
      isVip: boolean
      role: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avatar<T extends User$avatarArgs<ExtArgs> = {}>(args?: Subset<T, User$avatarArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    friends<T extends User$friendsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    friend<T extends User$friendArgs<ExtArgs> = {}>(args?: Subset<T, User$friendArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    userStats<T extends User$userStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$userStatsArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    userEvents<T extends User$userEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$userEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    gameResults<T extends User$gameResultsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly pseudo: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly birthdate: FieldRef<"User", 'DateTime'>
    readonly isVip: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.avatar
   */
  export type User$avatarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
  }

  /**
   * User.friends
   */
  export type User$friendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.friend
   */
  export type User$friendArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.userStats
   */
  export type User$userStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    where?: UserStatsWhereInput
  }

  /**
   * User.userEvents
   */
  export type User$userEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * User.gameResults
   */
  export type User$gameResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    where?: GameResultWhereInput
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    cursor?: GameResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Avatar
   */

  export type AggregateAvatar = {
    _count: AvatarCountAggregateOutputType | null
    _avg: AvatarAvgAggregateOutputType | null
    _sum: AvatarSumAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  export type AvatarAvgAggregateOutputType = {
    id: number | null
    shapeId: number | null
    eyesId: number | null
    mouthId: number | null
    patternId: number | null
    colorShapeId: number | null
    colorPatternId: number | null
    userId: number | null
  }

  export type AvatarSumAggregateOutputType = {
    id: number | null
    shapeId: number | null
    eyesId: number | null
    mouthId: number | null
    patternId: number | null
    colorShapeId: number | null
    colorPatternId: number | null
    userId: number | null
  }

  export type AvatarMinAggregateOutputType = {
    id: number | null
    url: string | null
    shapeId: number | null
    eyesId: number | null
    mouthId: number | null
    patternId: number | null
    colorShapeId: number | null
    colorPatternId: number | null
    userId: number | null
  }

  export type AvatarMaxAggregateOutputType = {
    id: number | null
    url: string | null
    shapeId: number | null
    eyesId: number | null
    mouthId: number | null
    patternId: number | null
    colorShapeId: number | null
    colorPatternId: number | null
    userId: number | null
  }

  export type AvatarCountAggregateOutputType = {
    id: number
    url: number
    shapeId: number
    eyesId: number
    mouthId: number
    patternId: number
    colorShapeId: number
    colorPatternId: number
    userId: number
    _all: number
  }


  export type AvatarAvgAggregateInputType = {
    id?: true
    shapeId?: true
    eyesId?: true
    mouthId?: true
    patternId?: true
    colorShapeId?: true
    colorPatternId?: true
    userId?: true
  }

  export type AvatarSumAggregateInputType = {
    id?: true
    shapeId?: true
    eyesId?: true
    mouthId?: true
    patternId?: true
    colorShapeId?: true
    colorPatternId?: true
    userId?: true
  }

  export type AvatarMinAggregateInputType = {
    id?: true
    url?: true
    shapeId?: true
    eyesId?: true
    mouthId?: true
    patternId?: true
    colorShapeId?: true
    colorPatternId?: true
    userId?: true
  }

  export type AvatarMaxAggregateInputType = {
    id?: true
    url?: true
    shapeId?: true
    eyesId?: true
    mouthId?: true
    patternId?: true
    colorShapeId?: true
    colorPatternId?: true
    userId?: true
  }

  export type AvatarCountAggregateInputType = {
    id?: true
    url?: true
    shapeId?: true
    eyesId?: true
    mouthId?: true
    patternId?: true
    colorShapeId?: true
    colorPatternId?: true
    userId?: true
    _all?: true
  }

  export type AvatarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatar to aggregate.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Avatars
    **/
    _count?: true | AvatarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvatarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvatarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvatarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvatarMaxAggregateInputType
  }

  export type GetAvatarAggregateType<T extends AvatarAggregateArgs> = {
        [P in keyof T & keyof AggregateAvatar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvatar[P]>
      : GetScalarType<T[P], AggregateAvatar[P]>
  }




  export type AvatarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithAggregationInput | AvatarOrderByWithAggregationInput[]
    by: AvatarScalarFieldEnum[] | AvatarScalarFieldEnum
    having?: AvatarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvatarCountAggregateInputType | true
    _avg?: AvatarAvgAggregateInputType
    _sum?: AvatarSumAggregateInputType
    _min?: AvatarMinAggregateInputType
    _max?: AvatarMaxAggregateInputType
  }

  export type AvatarGroupByOutputType = {
    id: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId: number | null
    colorShapeId: number
    colorPatternId: number | null
    userId: number
    _count: AvatarCountAggregateOutputType | null
    _avg: AvatarAvgAggregateOutputType | null
    _sum: AvatarSumAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  type GetAvatarGroupByPayload<T extends AvatarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvatarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvatarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvatarGroupByOutputType[P]>
            : GetScalarType<T[P], AvatarGroupByOutputType[P]>
        }
      >
    >


  export type AvatarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    shapeId?: boolean
    eyesId?: boolean
    mouthId?: boolean
    patternId?: boolean
    colorShapeId?: boolean
    colorPatternId?: boolean
    userId?: boolean
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    shapeId?: boolean
    eyesId?: boolean
    mouthId?: boolean
    patternId?: boolean
    colorShapeId?: boolean
    colorPatternId?: boolean
    userId?: boolean
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    shapeId?: boolean
    eyesId?: boolean
    mouthId?: boolean
    patternId?: boolean
    colorShapeId?: boolean
    colorPatternId?: boolean
    userId?: boolean
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectScalar = {
    id?: boolean
    url?: boolean
    shapeId?: boolean
    eyesId?: boolean
    mouthId?: boolean
    patternId?: boolean
    colorShapeId?: boolean
    colorPatternId?: boolean
    userId?: boolean
  }

  export type AvatarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "shapeId" | "eyesId" | "mouthId" | "patternId" | "colorShapeId" | "colorPatternId" | "userId", ExtArgs["result"]["avatar"]>
  export type AvatarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AvatarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AvatarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shape?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    eyes?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    mouth?: boolean | AvatarAssetDefaultArgs<ExtArgs>
    pattern?: boolean | Avatar$patternArgs<ExtArgs>
    colorShape?: boolean | ColorDefaultArgs<ExtArgs>
    colorPattern?: boolean | Avatar$colorPatternArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AvatarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Avatar"
    objects: {
      shape: Prisma.$AvatarAssetPayload<ExtArgs>
      eyes: Prisma.$AvatarAssetPayload<ExtArgs>
      mouth: Prisma.$AvatarAssetPayload<ExtArgs>
      pattern: Prisma.$AvatarAssetPayload<ExtArgs> | null
      colorShape: Prisma.$ColorPayload<ExtArgs>
      colorPattern: Prisma.$ColorPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      shapeId: number
      eyesId: number
      mouthId: number
      patternId: number | null
      colorShapeId: number
      colorPatternId: number | null
      userId: number
    }, ExtArgs["result"]["avatar"]>
    composites: {}
  }

  type AvatarGetPayload<S extends boolean | null | undefined | AvatarDefaultArgs> = $Result.GetResult<Prisma.$AvatarPayload, S>

  type AvatarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvatarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvatarCountAggregateInputType | true
    }

  export interface AvatarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Avatar'], meta: { name: 'Avatar' } }
    /**
     * Find zero or one Avatar that matches the filter.
     * @param {AvatarFindUniqueArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvatarFindUniqueArgs>(args: SelectSubset<T, AvatarFindUniqueArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Avatar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvatarFindUniqueOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvatarFindUniqueOrThrowArgs>(args: SelectSubset<T, AvatarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Avatar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvatarFindFirstArgs>(args?: SelectSubset<T, AvatarFindFirstArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Avatar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvatarFindFirstOrThrowArgs>(args?: SelectSubset<T, AvatarFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Avatars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avatars
     * const avatars = await prisma.avatar.findMany()
     * 
     * // Get first 10 Avatars
     * const avatars = await prisma.avatar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avatarWithIdOnly = await prisma.avatar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvatarFindManyArgs>(args?: SelectSubset<T, AvatarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Avatar.
     * @param {AvatarCreateArgs} args - Arguments to create a Avatar.
     * @example
     * // Create one Avatar
     * const Avatar = await prisma.avatar.create({
     *   data: {
     *     // ... data to create a Avatar
     *   }
     * })
     * 
     */
    create<T extends AvatarCreateArgs>(args: SelectSubset<T, AvatarCreateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Avatars.
     * @param {AvatarCreateManyArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvatarCreateManyArgs>(args?: SelectSubset<T, AvatarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Avatars and returns the data saved in the database.
     * @param {AvatarCreateManyAndReturnArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvatarCreateManyAndReturnArgs>(args?: SelectSubset<T, AvatarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Avatar.
     * @param {AvatarDeleteArgs} args - Arguments to delete one Avatar.
     * @example
     * // Delete one Avatar
     * const Avatar = await prisma.avatar.delete({
     *   where: {
     *     // ... filter to delete one Avatar
     *   }
     * })
     * 
     */
    delete<T extends AvatarDeleteArgs>(args: SelectSubset<T, AvatarDeleteArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Avatar.
     * @param {AvatarUpdateArgs} args - Arguments to update one Avatar.
     * @example
     * // Update one Avatar
     * const avatar = await prisma.avatar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvatarUpdateArgs>(args: SelectSubset<T, AvatarUpdateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Avatars.
     * @param {AvatarDeleteManyArgs} args - Arguments to filter Avatars to delete.
     * @example
     * // Delete a few Avatars
     * const { count } = await prisma.avatar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvatarDeleteManyArgs>(args?: SelectSubset<T, AvatarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvatarUpdateManyArgs>(args: SelectSubset<T, AvatarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars and returns the data updated in the database.
     * @param {AvatarUpdateManyAndReturnArgs} args - Arguments to update many Avatars.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvatarUpdateManyAndReturnArgs>(args: SelectSubset<T, AvatarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Avatar.
     * @param {AvatarUpsertArgs} args - Arguments to update or create a Avatar.
     * @example
     * // Update or create a Avatar
     * const avatar = await prisma.avatar.upsert({
     *   create: {
     *     // ... data to create a Avatar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Avatar we want to update
     *   }
     * })
     */
    upsert<T extends AvatarUpsertArgs>(args: SelectSubset<T, AvatarUpsertArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarCountArgs} args - Arguments to filter Avatars to count.
     * @example
     * // Count the number of Avatars
     * const count = await prisma.avatar.count({
     *   where: {
     *     // ... the filter for the Avatars we want to count
     *   }
     * })
    **/
    count<T extends AvatarCountArgs>(
      args?: Subset<T, AvatarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvatarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvatarAggregateArgs>(args: Subset<T, AvatarAggregateArgs>): Prisma.PrismaPromise<GetAvatarAggregateType<T>>

    /**
     * Group by Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvatarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvatarGroupByArgs['orderBy'] }
        : { orderBy?: AvatarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvatarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvatarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Avatar model
   */
  readonly fields: AvatarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Avatar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvatarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shape<T extends AvatarAssetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAssetDefaultArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    eyes<T extends AvatarAssetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAssetDefaultArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    mouth<T extends AvatarAssetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAssetDefaultArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    pattern<T extends Avatar$patternArgs<ExtArgs> = {}>(args?: Subset<T, Avatar$patternArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    colorShape<T extends ColorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ColorDefaultArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    colorPattern<T extends Avatar$colorPatternArgs<ExtArgs> = {}>(args?: Subset<T, Avatar$colorPatternArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Avatar model
   */ 
  interface AvatarFieldRefs {
    readonly id: FieldRef<"Avatar", 'Int'>
    readonly url: FieldRef<"Avatar", 'String'>
    readonly shapeId: FieldRef<"Avatar", 'Int'>
    readonly eyesId: FieldRef<"Avatar", 'Int'>
    readonly mouthId: FieldRef<"Avatar", 'Int'>
    readonly patternId: FieldRef<"Avatar", 'Int'>
    readonly colorShapeId: FieldRef<"Avatar", 'Int'>
    readonly colorPatternId: FieldRef<"Avatar", 'Int'>
    readonly userId: FieldRef<"Avatar", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Avatar findUnique
   */
  export type AvatarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findUniqueOrThrow
   */
  export type AvatarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findFirst
   */
  export type AvatarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findFirstOrThrow
   */
  export type AvatarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findMany
   */
  export type AvatarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatars to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar create
   */
  export type AvatarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to create a Avatar.
     */
    data: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
  }

  /**
   * Avatar createMany
   */
  export type AvatarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avatar createManyAndReturn
   */
  export type AvatarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Avatar update
   */
  export type AvatarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to update a Avatar.
     */
    data: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
    /**
     * Choose, which Avatar to update.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar updateMany
   */
  export type AvatarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
  }

  /**
   * Avatar updateManyAndReturn
   */
  export type AvatarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Avatar upsert
   */
  export type AvatarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The filter to search for the Avatar to update in case it exists.
     */
    where: AvatarWhereUniqueInput
    /**
     * In case the Avatar found by the `where` argument doesn't exist, create a new Avatar with this data.
     */
    create: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
    /**
     * In case the Avatar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
  }

  /**
   * Avatar delete
   */
  export type AvatarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter which Avatar to delete.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar deleteMany
   */
  export type AvatarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatars to delete
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to delete.
     */
    limit?: number
  }

  /**
   * Avatar.pattern
   */
  export type Avatar$patternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    where?: AvatarAssetWhereInput
  }

  /**
   * Avatar.colorPattern
   */
  export type Avatar$colorPatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    where?: ColorWhereInput
  }

  /**
   * Avatar without action
   */
  export type AvatarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
  }


  /**
   * Model Color
   */

  export type AggregateColor = {
    _count: ColorCountAggregateOutputType | null
    _avg: ColorAvgAggregateOutputType | null
    _sum: ColorSumAggregateOutputType | null
    _min: ColorMinAggregateOutputType | null
    _max: ColorMaxAggregateOutputType | null
  }

  export type ColorAvgAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type ColorSumAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type ColorMinAggregateOutputType = {
    id: number | null
    name: string | null
    value: string | null
    gradientValue: string | null
    level: number | null
    vip: boolean | null
  }

  export type ColorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    value: string | null
    gradientValue: string | null
    level: number | null
    vip: boolean | null
  }

  export type ColorCountAggregateOutputType = {
    id: number
    name: number
    value: number
    gradientValue: number
    level: number
    vip: number
    _all: number
  }


  export type ColorAvgAggregateInputType = {
    id?: true
    level?: true
  }

  export type ColorSumAggregateInputType = {
    id?: true
    level?: true
  }

  export type ColorMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    gradientValue?: true
    level?: true
    vip?: true
  }

  export type ColorMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    gradientValue?: true
    level?: true
    vip?: true
  }

  export type ColorCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    gradientValue?: true
    level?: true
    vip?: true
    _all?: true
  }

  export type ColorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Color to aggregate.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colors
    **/
    _count?: true | ColorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColorMaxAggregateInputType
  }

  export type GetColorAggregateType<T extends ColorAggregateArgs> = {
        [P in keyof T & keyof AggregateColor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColor[P]>
      : GetScalarType<T[P], AggregateColor[P]>
  }




  export type ColorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColorWhereInput
    orderBy?: ColorOrderByWithAggregationInput | ColorOrderByWithAggregationInput[]
    by: ColorScalarFieldEnum[] | ColorScalarFieldEnum
    having?: ColorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColorCountAggregateInputType | true
    _avg?: ColorAvgAggregateInputType
    _sum?: ColorSumAggregateInputType
    _min?: ColorMinAggregateInputType
    _max?: ColorMaxAggregateInputType
  }

  export type ColorGroupByOutputType = {
    id: number
    name: string
    value: string
    gradientValue: string | null
    level: number
    vip: boolean
    _count: ColorCountAggregateOutputType | null
    _avg: ColorAvgAggregateOutputType | null
    _sum: ColorSumAggregateOutputType | null
    _min: ColorMinAggregateOutputType | null
    _max: ColorMaxAggregateOutputType | null
  }

  type GetColorGroupByPayload<T extends ColorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColorGroupByOutputType[P]>
            : GetScalarType<T[P], ColorGroupByOutputType[P]>
        }
      >
    >


  export type ColorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    gradientValue?: boolean
    level?: boolean
    vip?: boolean
    colorShape?: boolean | Color$colorShapeArgs<ExtArgs>
    colorPattern?: boolean | Color$colorPatternArgs<ExtArgs>
    _count?: boolean | ColorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["color"]>

  export type ColorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    gradientValue?: boolean
    level?: boolean
    vip?: boolean
  }, ExtArgs["result"]["color"]>

  export type ColorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    gradientValue?: boolean
    level?: boolean
    vip?: boolean
  }, ExtArgs["result"]["color"]>

  export type ColorSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
    gradientValue?: boolean
    level?: boolean
    vip?: boolean
  }

  export type ColorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value" | "gradientValue" | "level" | "vip", ExtArgs["result"]["color"]>
  export type ColorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    colorShape?: boolean | Color$colorShapeArgs<ExtArgs>
    colorPattern?: boolean | Color$colorPatternArgs<ExtArgs>
    _count?: boolean | ColorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ColorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ColorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Color"
    objects: {
      colorShape: Prisma.$AvatarPayload<ExtArgs>[]
      colorPattern: Prisma.$AvatarPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      value: string
      gradientValue: string | null
      level: number
      vip: boolean
    }, ExtArgs["result"]["color"]>
    composites: {}
  }

  type ColorGetPayload<S extends boolean | null | undefined | ColorDefaultArgs> = $Result.GetResult<Prisma.$ColorPayload, S>

  type ColorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColorCountAggregateInputType | true
    }

  export interface ColorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Color'], meta: { name: 'Color' } }
    /**
     * Find zero or one Color that matches the filter.
     * @param {ColorFindUniqueArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColorFindUniqueArgs>(args: SelectSubset<T, ColorFindUniqueArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Color that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColorFindUniqueOrThrowArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColorFindUniqueOrThrowArgs>(args: SelectSubset<T, ColorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Color that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindFirstArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColorFindFirstArgs>(args?: SelectSubset<T, ColorFindFirstArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Color that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindFirstOrThrowArgs} args - Arguments to find a Color
     * @example
     * // Get one Color
     * const color = await prisma.color.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColorFindFirstOrThrowArgs>(args?: SelectSubset<T, ColorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Colors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colors
     * const colors = await prisma.color.findMany()
     * 
     * // Get first 10 Colors
     * const colors = await prisma.color.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colorWithIdOnly = await prisma.color.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColorFindManyArgs>(args?: SelectSubset<T, ColorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Color.
     * @param {ColorCreateArgs} args - Arguments to create a Color.
     * @example
     * // Create one Color
     * const Color = await prisma.color.create({
     *   data: {
     *     // ... data to create a Color
     *   }
     * })
     * 
     */
    create<T extends ColorCreateArgs>(args: SelectSubset<T, ColorCreateArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Colors.
     * @param {ColorCreateManyArgs} args - Arguments to create many Colors.
     * @example
     * // Create many Colors
     * const color = await prisma.color.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColorCreateManyArgs>(args?: SelectSubset<T, ColorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colors and returns the data saved in the database.
     * @param {ColorCreateManyAndReturnArgs} args - Arguments to create many Colors.
     * @example
     * // Create many Colors
     * const color = await prisma.color.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colors and only return the `id`
     * const colorWithIdOnly = await prisma.color.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColorCreateManyAndReturnArgs>(args?: SelectSubset<T, ColorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Color.
     * @param {ColorDeleteArgs} args - Arguments to delete one Color.
     * @example
     * // Delete one Color
     * const Color = await prisma.color.delete({
     *   where: {
     *     // ... filter to delete one Color
     *   }
     * })
     * 
     */
    delete<T extends ColorDeleteArgs>(args: SelectSubset<T, ColorDeleteArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Color.
     * @param {ColorUpdateArgs} args - Arguments to update one Color.
     * @example
     * // Update one Color
     * const color = await prisma.color.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColorUpdateArgs>(args: SelectSubset<T, ColorUpdateArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Colors.
     * @param {ColorDeleteManyArgs} args - Arguments to filter Colors to delete.
     * @example
     * // Delete a few Colors
     * const { count } = await prisma.color.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColorDeleteManyArgs>(args?: SelectSubset<T, ColorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colors
     * const color = await prisma.color.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColorUpdateManyArgs>(args: SelectSubset<T, ColorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colors and returns the data updated in the database.
     * @param {ColorUpdateManyAndReturnArgs} args - Arguments to update many Colors.
     * @example
     * // Update many Colors
     * const color = await prisma.color.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colors and only return the `id`
     * const colorWithIdOnly = await prisma.color.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColorUpdateManyAndReturnArgs>(args: SelectSubset<T, ColorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Color.
     * @param {ColorUpsertArgs} args - Arguments to update or create a Color.
     * @example
     * // Update or create a Color
     * const color = await prisma.color.upsert({
     *   create: {
     *     // ... data to create a Color
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Color we want to update
     *   }
     * })
     */
    upsert<T extends ColorUpsertArgs>(args: SelectSubset<T, ColorUpsertArgs<ExtArgs>>): Prisma__ColorClient<$Result.GetResult<Prisma.$ColorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Colors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorCountArgs} args - Arguments to filter Colors to count.
     * @example
     * // Count the number of Colors
     * const count = await prisma.color.count({
     *   where: {
     *     // ... the filter for the Colors we want to count
     *   }
     * })
    **/
    count<T extends ColorCountArgs>(
      args?: Subset<T, ColorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Color.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColorAggregateArgs>(args: Subset<T, ColorAggregateArgs>): Prisma.PrismaPromise<GetColorAggregateType<T>>

    /**
     * Group by Color.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColorGroupByArgs['orderBy'] }
        : { orderBy?: ColorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Color model
   */
  readonly fields: ColorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Color.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    colorShape<T extends Color$colorShapeArgs<ExtArgs> = {}>(args?: Subset<T, Color$colorShapeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    colorPattern<T extends Color$colorPatternArgs<ExtArgs> = {}>(args?: Subset<T, Color$colorPatternArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Color model
   */ 
  interface ColorFieldRefs {
    readonly id: FieldRef<"Color", 'Int'>
    readonly name: FieldRef<"Color", 'String'>
    readonly value: FieldRef<"Color", 'String'>
    readonly gradientValue: FieldRef<"Color", 'String'>
    readonly level: FieldRef<"Color", 'Int'>
    readonly vip: FieldRef<"Color", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Color findUnique
   */
  export type ColorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where: ColorWhereUniqueInput
  }

  /**
   * Color findUniqueOrThrow
   */
  export type ColorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where: ColorWhereUniqueInput
  }

  /**
   * Color findFirst
   */
  export type ColorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colors.
     */
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
  }

  /**
   * Color findFirstOrThrow
   */
  export type ColorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Color to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colors.
     */
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
  }

  /**
   * Color findMany
   */
  export type ColorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter, which Colors to fetch.
     */
    where?: ColorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colors to fetch.
     */
    orderBy?: ColorOrderByWithRelationInput | ColorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colors.
     */
    cursor?: ColorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colors.
     */
    skip?: number
    distinct?: ColorScalarFieldEnum | ColorScalarFieldEnum[]
  }

  /**
   * Color create
   */
  export type ColorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The data needed to create a Color.
     */
    data: XOR<ColorCreateInput, ColorUncheckedCreateInput>
  }

  /**
   * Color createMany
   */
  export type ColorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colors.
     */
    data: ColorCreateManyInput | ColorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Color createManyAndReturn
   */
  export type ColorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * The data used to create many Colors.
     */
    data: ColorCreateManyInput | ColorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Color update
   */
  export type ColorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The data needed to update a Color.
     */
    data: XOR<ColorUpdateInput, ColorUncheckedUpdateInput>
    /**
     * Choose, which Color to update.
     */
    where: ColorWhereUniqueInput
  }

  /**
   * Color updateMany
   */
  export type ColorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colors.
     */
    data: XOR<ColorUpdateManyMutationInput, ColorUncheckedUpdateManyInput>
    /**
     * Filter which Colors to update
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to update.
     */
    limit?: number
  }

  /**
   * Color updateManyAndReturn
   */
  export type ColorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * The data used to update Colors.
     */
    data: XOR<ColorUpdateManyMutationInput, ColorUncheckedUpdateManyInput>
    /**
     * Filter which Colors to update
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to update.
     */
    limit?: number
  }

  /**
   * Color upsert
   */
  export type ColorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * The filter to search for the Color to update in case it exists.
     */
    where: ColorWhereUniqueInput
    /**
     * In case the Color found by the `where` argument doesn't exist, create a new Color with this data.
     */
    create: XOR<ColorCreateInput, ColorUncheckedCreateInput>
    /**
     * In case the Color was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColorUpdateInput, ColorUncheckedUpdateInput>
  }

  /**
   * Color delete
   */
  export type ColorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
    /**
     * Filter which Color to delete.
     */
    where: ColorWhereUniqueInput
  }

  /**
   * Color deleteMany
   */
  export type ColorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colors to delete
     */
    where?: ColorWhereInput
    /**
     * Limit how many Colors to delete.
     */
    limit?: number
  }

  /**
   * Color.colorShape
   */
  export type Color$colorShapeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Color.colorPattern
   */
  export type Color$colorPatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Color without action
   */
  export type ColorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Color
     */
    select?: ColorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Color
     */
    omit?: ColorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColorInclude<ExtArgs> | null
  }


  /**
   * Model AvatarAsset
   */

  export type AggregateAvatarAsset = {
    _count: AvatarAssetCountAggregateOutputType | null
    _avg: AvatarAssetAvgAggregateOutputType | null
    _sum: AvatarAssetSumAggregateOutputType | null
    _min: AvatarAssetMinAggregateOutputType | null
    _max: AvatarAssetMaxAggregateOutputType | null
  }

  export type AvatarAssetAvgAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type AvatarAssetSumAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type AvatarAssetMinAggregateOutputType = {
    id: number | null
    type: string | null
    name: string | null
    url: string | null
    level: number | null
    vipOnly: boolean | null
  }

  export type AvatarAssetMaxAggregateOutputType = {
    id: number | null
    type: string | null
    name: string | null
    url: string | null
    level: number | null
    vipOnly: boolean | null
  }

  export type AvatarAssetCountAggregateOutputType = {
    id: number
    type: number
    name: number
    url: number
    level: number
    vipOnly: number
    _all: number
  }


  export type AvatarAssetAvgAggregateInputType = {
    id?: true
    level?: true
  }

  export type AvatarAssetSumAggregateInputType = {
    id?: true
    level?: true
  }

  export type AvatarAssetMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    level?: true
    vipOnly?: true
  }

  export type AvatarAssetMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    level?: true
    vipOnly?: true
  }

  export type AvatarAssetCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    url?: true
    level?: true
    vipOnly?: true
    _all?: true
  }

  export type AvatarAssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvatarAsset to aggregate.
     */
    where?: AvatarAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarAssets to fetch.
     */
    orderBy?: AvatarAssetOrderByWithRelationInput | AvatarAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvatarAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvatarAssets
    **/
    _count?: true | AvatarAssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvatarAssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvatarAssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvatarAssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvatarAssetMaxAggregateInputType
  }

  export type GetAvatarAssetAggregateType<T extends AvatarAssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAvatarAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvatarAsset[P]>
      : GetScalarType<T[P], AggregateAvatarAsset[P]>
  }




  export type AvatarAssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarAssetWhereInput
    orderBy?: AvatarAssetOrderByWithAggregationInput | AvatarAssetOrderByWithAggregationInput[]
    by: AvatarAssetScalarFieldEnum[] | AvatarAssetScalarFieldEnum
    having?: AvatarAssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvatarAssetCountAggregateInputType | true
    _avg?: AvatarAssetAvgAggregateInputType
    _sum?: AvatarAssetSumAggregateInputType
    _min?: AvatarAssetMinAggregateInputType
    _max?: AvatarAssetMaxAggregateInputType
  }

  export type AvatarAssetGroupByOutputType = {
    id: number
    type: string
    name: string
    url: string
    level: number
    vipOnly: boolean
    _count: AvatarAssetCountAggregateOutputType | null
    _avg: AvatarAssetAvgAggregateOutputType | null
    _sum: AvatarAssetSumAggregateOutputType | null
    _min: AvatarAssetMinAggregateOutputType | null
    _max: AvatarAssetMaxAggregateOutputType | null
  }

  type GetAvatarAssetGroupByPayload<T extends AvatarAssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvatarAssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvatarAssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvatarAssetGroupByOutputType[P]>
            : GetScalarType<T[P], AvatarAssetGroupByOutputType[P]>
        }
      >
    >


  export type AvatarAssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    level?: boolean
    vipOnly?: boolean
    shapes?: boolean | AvatarAsset$shapesArgs<ExtArgs>
    eyes?: boolean | AvatarAsset$eyesArgs<ExtArgs>
    mouths?: boolean | AvatarAsset$mouthsArgs<ExtArgs>
    patterns?: boolean | AvatarAsset$patternsArgs<ExtArgs>
    userEvents?: boolean | AvatarAsset$userEventsArgs<ExtArgs>
    _count?: boolean | AvatarAssetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatarAsset"]>

  export type AvatarAssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    level?: boolean
    vipOnly?: boolean
  }, ExtArgs["result"]["avatarAsset"]>

  export type AvatarAssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    level?: boolean
    vipOnly?: boolean
  }, ExtArgs["result"]["avatarAsset"]>

  export type AvatarAssetSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    url?: boolean
    level?: boolean
    vipOnly?: boolean
  }

  export type AvatarAssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "url" | "level" | "vipOnly", ExtArgs["result"]["avatarAsset"]>
  export type AvatarAssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shapes?: boolean | AvatarAsset$shapesArgs<ExtArgs>
    eyes?: boolean | AvatarAsset$eyesArgs<ExtArgs>
    mouths?: boolean | AvatarAsset$mouthsArgs<ExtArgs>
    patterns?: boolean | AvatarAsset$patternsArgs<ExtArgs>
    userEvents?: boolean | AvatarAsset$userEventsArgs<ExtArgs>
    _count?: boolean | AvatarAssetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvatarAssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AvatarAssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AvatarAssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvatarAsset"
    objects: {
      shapes: Prisma.$AvatarPayload<ExtArgs>[]
      eyes: Prisma.$AvatarPayload<ExtArgs>[]
      mouths: Prisma.$AvatarPayload<ExtArgs>[]
      patterns: Prisma.$AvatarPayload<ExtArgs>[]
      userEvents: Prisma.$UserEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      name: string
      url: string
      level: number
      vipOnly: boolean
    }, ExtArgs["result"]["avatarAsset"]>
    composites: {}
  }

  type AvatarAssetGetPayload<S extends boolean | null | undefined | AvatarAssetDefaultArgs> = $Result.GetResult<Prisma.$AvatarAssetPayload, S>

  type AvatarAssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvatarAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvatarAssetCountAggregateInputType | true
    }

  export interface AvatarAssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvatarAsset'], meta: { name: 'AvatarAsset' } }
    /**
     * Find zero or one AvatarAsset that matches the filter.
     * @param {AvatarAssetFindUniqueArgs} args - Arguments to find a AvatarAsset
     * @example
     * // Get one AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvatarAssetFindUniqueArgs>(args: SelectSubset<T, AvatarAssetFindUniqueArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AvatarAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvatarAssetFindUniqueOrThrowArgs} args - Arguments to find a AvatarAsset
     * @example
     * // Get one AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvatarAssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AvatarAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AvatarAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetFindFirstArgs} args - Arguments to find a AvatarAsset
     * @example
     * // Get one AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvatarAssetFindFirstArgs>(args?: SelectSubset<T, AvatarAssetFindFirstArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AvatarAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetFindFirstOrThrowArgs} args - Arguments to find a AvatarAsset
     * @example
     * // Get one AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvatarAssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AvatarAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AvatarAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvatarAssets
     * const avatarAssets = await prisma.avatarAsset.findMany()
     * 
     * // Get first 10 AvatarAssets
     * const avatarAssets = await prisma.avatarAsset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avatarAssetWithIdOnly = await prisma.avatarAsset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvatarAssetFindManyArgs>(args?: SelectSubset<T, AvatarAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AvatarAsset.
     * @param {AvatarAssetCreateArgs} args - Arguments to create a AvatarAsset.
     * @example
     * // Create one AvatarAsset
     * const AvatarAsset = await prisma.avatarAsset.create({
     *   data: {
     *     // ... data to create a AvatarAsset
     *   }
     * })
     * 
     */
    create<T extends AvatarAssetCreateArgs>(args: SelectSubset<T, AvatarAssetCreateArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AvatarAssets.
     * @param {AvatarAssetCreateManyArgs} args - Arguments to create many AvatarAssets.
     * @example
     * // Create many AvatarAssets
     * const avatarAsset = await prisma.avatarAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvatarAssetCreateManyArgs>(args?: SelectSubset<T, AvatarAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvatarAssets and returns the data saved in the database.
     * @param {AvatarAssetCreateManyAndReturnArgs} args - Arguments to create many AvatarAssets.
     * @example
     * // Create many AvatarAssets
     * const avatarAsset = await prisma.avatarAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvatarAssets and only return the `id`
     * const avatarAssetWithIdOnly = await prisma.avatarAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvatarAssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AvatarAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AvatarAsset.
     * @param {AvatarAssetDeleteArgs} args - Arguments to delete one AvatarAsset.
     * @example
     * // Delete one AvatarAsset
     * const AvatarAsset = await prisma.avatarAsset.delete({
     *   where: {
     *     // ... filter to delete one AvatarAsset
     *   }
     * })
     * 
     */
    delete<T extends AvatarAssetDeleteArgs>(args: SelectSubset<T, AvatarAssetDeleteArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AvatarAsset.
     * @param {AvatarAssetUpdateArgs} args - Arguments to update one AvatarAsset.
     * @example
     * // Update one AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvatarAssetUpdateArgs>(args: SelectSubset<T, AvatarAssetUpdateArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AvatarAssets.
     * @param {AvatarAssetDeleteManyArgs} args - Arguments to filter AvatarAssets to delete.
     * @example
     * // Delete a few AvatarAssets
     * const { count } = await prisma.avatarAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvatarAssetDeleteManyArgs>(args?: SelectSubset<T, AvatarAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvatarAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvatarAssets
     * const avatarAsset = await prisma.avatarAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvatarAssetUpdateManyArgs>(args: SelectSubset<T, AvatarAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvatarAssets and returns the data updated in the database.
     * @param {AvatarAssetUpdateManyAndReturnArgs} args - Arguments to update many AvatarAssets.
     * @example
     * // Update many AvatarAssets
     * const avatarAsset = await prisma.avatarAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvatarAssets and only return the `id`
     * const avatarAssetWithIdOnly = await prisma.avatarAsset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvatarAssetUpdateManyAndReturnArgs>(args: SelectSubset<T, AvatarAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AvatarAsset.
     * @param {AvatarAssetUpsertArgs} args - Arguments to update or create a AvatarAsset.
     * @example
     * // Update or create a AvatarAsset
     * const avatarAsset = await prisma.avatarAsset.upsert({
     *   create: {
     *     // ... data to create a AvatarAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvatarAsset we want to update
     *   }
     * })
     */
    upsert<T extends AvatarAssetUpsertArgs>(args: SelectSubset<T, AvatarAssetUpsertArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AvatarAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetCountArgs} args - Arguments to filter AvatarAssets to count.
     * @example
     * // Count the number of AvatarAssets
     * const count = await prisma.avatarAsset.count({
     *   where: {
     *     // ... the filter for the AvatarAssets we want to count
     *   }
     * })
    **/
    count<T extends AvatarAssetCountArgs>(
      args?: Subset<T, AvatarAssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvatarAssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvatarAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvatarAssetAggregateArgs>(args: Subset<T, AvatarAssetAggregateArgs>): Prisma.PrismaPromise<GetAvatarAssetAggregateType<T>>

    /**
     * Group by AvatarAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvatarAssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvatarAssetGroupByArgs['orderBy'] }
        : { orderBy?: AvatarAssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvatarAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvatarAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvatarAsset model
   */
  readonly fields: AvatarAssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvatarAsset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvatarAssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shapes<T extends AvatarAsset$shapesArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAsset$shapesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    eyes<T extends AvatarAsset$eyesArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAsset$eyesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    mouths<T extends AvatarAsset$mouthsArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAsset$mouthsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    patterns<T extends AvatarAsset$patternsArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAsset$patternsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    userEvents<T extends AvatarAsset$userEventsArgs<ExtArgs> = {}>(args?: Subset<T, AvatarAsset$userEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvatarAsset model
   */ 
  interface AvatarAssetFieldRefs {
    readonly id: FieldRef<"AvatarAsset", 'Int'>
    readonly type: FieldRef<"AvatarAsset", 'String'>
    readonly name: FieldRef<"AvatarAsset", 'String'>
    readonly url: FieldRef<"AvatarAsset", 'String'>
    readonly level: FieldRef<"AvatarAsset", 'Int'>
    readonly vipOnly: FieldRef<"AvatarAsset", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AvatarAsset findUnique
   */
  export type AvatarAssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter, which AvatarAsset to fetch.
     */
    where: AvatarAssetWhereUniqueInput
  }

  /**
   * AvatarAsset findUniqueOrThrow
   */
  export type AvatarAssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter, which AvatarAsset to fetch.
     */
    where: AvatarAssetWhereUniqueInput
  }

  /**
   * AvatarAsset findFirst
   */
  export type AvatarAssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter, which AvatarAsset to fetch.
     */
    where?: AvatarAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarAssets to fetch.
     */
    orderBy?: AvatarAssetOrderByWithRelationInput | AvatarAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvatarAssets.
     */
    cursor?: AvatarAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvatarAssets.
     */
    distinct?: AvatarAssetScalarFieldEnum | AvatarAssetScalarFieldEnum[]
  }

  /**
   * AvatarAsset findFirstOrThrow
   */
  export type AvatarAssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter, which AvatarAsset to fetch.
     */
    where?: AvatarAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarAssets to fetch.
     */
    orderBy?: AvatarAssetOrderByWithRelationInput | AvatarAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvatarAssets.
     */
    cursor?: AvatarAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvatarAssets.
     */
    distinct?: AvatarAssetScalarFieldEnum | AvatarAssetScalarFieldEnum[]
  }

  /**
   * AvatarAsset findMany
   */
  export type AvatarAssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter, which AvatarAssets to fetch.
     */
    where?: AvatarAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarAssets to fetch.
     */
    orderBy?: AvatarAssetOrderByWithRelationInput | AvatarAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvatarAssets.
     */
    cursor?: AvatarAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarAssets.
     */
    skip?: number
    distinct?: AvatarAssetScalarFieldEnum | AvatarAssetScalarFieldEnum[]
  }

  /**
   * AvatarAsset create
   */
  export type AvatarAssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * The data needed to create a AvatarAsset.
     */
    data: XOR<AvatarAssetCreateInput, AvatarAssetUncheckedCreateInput>
  }

  /**
   * AvatarAsset createMany
   */
  export type AvatarAssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvatarAssets.
     */
    data: AvatarAssetCreateManyInput | AvatarAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvatarAsset createManyAndReturn
   */
  export type AvatarAssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * The data used to create many AvatarAssets.
     */
    data: AvatarAssetCreateManyInput | AvatarAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvatarAsset update
   */
  export type AvatarAssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * The data needed to update a AvatarAsset.
     */
    data: XOR<AvatarAssetUpdateInput, AvatarAssetUncheckedUpdateInput>
    /**
     * Choose, which AvatarAsset to update.
     */
    where: AvatarAssetWhereUniqueInput
  }

  /**
   * AvatarAsset updateMany
   */
  export type AvatarAssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvatarAssets.
     */
    data: XOR<AvatarAssetUpdateManyMutationInput, AvatarAssetUncheckedUpdateManyInput>
    /**
     * Filter which AvatarAssets to update
     */
    where?: AvatarAssetWhereInput
    /**
     * Limit how many AvatarAssets to update.
     */
    limit?: number
  }

  /**
   * AvatarAsset updateManyAndReturn
   */
  export type AvatarAssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * The data used to update AvatarAssets.
     */
    data: XOR<AvatarAssetUpdateManyMutationInput, AvatarAssetUncheckedUpdateManyInput>
    /**
     * Filter which AvatarAssets to update
     */
    where?: AvatarAssetWhereInput
    /**
     * Limit how many AvatarAssets to update.
     */
    limit?: number
  }

  /**
   * AvatarAsset upsert
   */
  export type AvatarAssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * The filter to search for the AvatarAsset to update in case it exists.
     */
    where: AvatarAssetWhereUniqueInput
    /**
     * In case the AvatarAsset found by the `where` argument doesn't exist, create a new AvatarAsset with this data.
     */
    create: XOR<AvatarAssetCreateInput, AvatarAssetUncheckedCreateInput>
    /**
     * In case the AvatarAsset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvatarAssetUpdateInput, AvatarAssetUncheckedUpdateInput>
  }

  /**
   * AvatarAsset delete
   */
  export type AvatarAssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    /**
     * Filter which AvatarAsset to delete.
     */
    where: AvatarAssetWhereUniqueInput
  }

  /**
   * AvatarAsset deleteMany
   */
  export type AvatarAssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvatarAssets to delete
     */
    where?: AvatarAssetWhereInput
    /**
     * Limit how many AvatarAssets to delete.
     */
    limit?: number
  }

  /**
   * AvatarAsset.shapes
   */
  export type AvatarAsset$shapesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * AvatarAsset.eyes
   */
  export type AvatarAsset$eyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * AvatarAsset.mouths
   */
  export type AvatarAsset$mouthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * AvatarAsset.patterns
   */
  export type AvatarAsset$patternsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    cursor?: AvatarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * AvatarAsset.userEvents
   */
  export type AvatarAsset$userEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * AvatarAsset without action
   */
  export type AvatarAssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
  }


  /**
   * Model Friend
   */

  export type AggregateFriend = {
    _count: FriendCountAggregateOutputType | null
    _avg: FriendAvgAggregateOutputType | null
    _sum: FriendSumAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  export type FriendAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    friendId: number | null
  }

  export type FriendSumAggregateOutputType = {
    id: number | null
    userId: number | null
    friendId: number | null
  }

  export type FriendMinAggregateOutputType = {
    id: number | null
    userId: number | null
    friendId: number | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type FriendMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    friendId: number | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type FriendCountAggregateOutputType = {
    id: number
    userId: number
    friendId: number
    status: number
    createdAt: number
    deletedAt: number
    _all: number
  }


  export type FriendAvgAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
  }

  export type FriendSumAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
  }

  export type FriendMinAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
  }

  export type FriendMaxAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
  }

  export type FriendCountAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    _all?: true
  }

  export type FriendAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friend to aggregate.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friends
    **/
    _count?: true | FriendCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendMaxAggregateInputType
  }

  export type GetFriendAggregateType<T extends FriendAggregateArgs> = {
        [P in keyof T & keyof AggregateFriend]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriend[P]>
      : GetScalarType<T[P], AggregateFriend[P]>
  }




  export type FriendGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithAggregationInput | FriendOrderByWithAggregationInput[]
    by: FriendScalarFieldEnum[] | FriendScalarFieldEnum
    having?: FriendScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendCountAggregateInputType | true
    _avg?: FriendAvgAggregateInputType
    _sum?: FriendSumAggregateInputType
    _min?: FriendMinAggregateInputType
    _max?: FriendMaxAggregateInputType
  }

  export type FriendGroupByOutputType = {
    id: number
    userId: number
    friendId: number
    status: string
    createdAt: Date
    deletedAt: Date | null
    _count: FriendCountAggregateOutputType | null
    _avg: FriendAvgAggregateOutputType | null
    _sum: FriendSumAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  type GetFriendGroupByPayload<T extends FriendGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupByOutputType[P]>
        }
      >
    >


  export type FriendSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
    userEvents?: boolean | Friend$userEventsArgs<ExtArgs>
    _count?: boolean | FriendCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectScalar = {
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }

  export type FriendOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "friendId" | "status" | "createdAt" | "deletedAt", ExtArgs["result"]["friend"]>
  export type FriendInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
    userEvents?: boolean | Friend$userEventsArgs<ExtArgs>
    _count?: boolean | FriendCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FriendIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friend"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      friend: Prisma.$UserPayload<ExtArgs>
      userEvents: Prisma.$UserEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      friendId: number
      status: string
      createdAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["friend"]>
    composites: {}
  }

  type FriendGetPayload<S extends boolean | null | undefined | FriendDefaultArgs> = $Result.GetResult<Prisma.$FriendPayload, S>

  type FriendCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendCountAggregateInputType | true
    }

  export interface FriendDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friend'], meta: { name: 'Friend' } }
    /**
     * Find zero or one Friend that matches the filter.
     * @param {FriendFindUniqueArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendFindUniqueArgs>(args: SelectSubset<T, FriendFindUniqueArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Friend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendFindUniqueOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Friend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendFindFirstArgs>(args?: SelectSubset<T, FriendFindFirstArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Friend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friends
     * const friends = await prisma.friend.findMany()
     * 
     * // Get first 10 Friends
     * const friends = await prisma.friend.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendWithIdOnly = await prisma.friend.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendFindManyArgs>(args?: SelectSubset<T, FriendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Friend.
     * @param {FriendCreateArgs} args - Arguments to create a Friend.
     * @example
     * // Create one Friend
     * const Friend = await prisma.friend.create({
     *   data: {
     *     // ... data to create a Friend
     *   }
     * })
     * 
     */
    create<T extends FriendCreateArgs>(args: SelectSubset<T, FriendCreateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Friends.
     * @param {FriendCreateManyArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendCreateManyArgs>(args?: SelectSubset<T, FriendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friends and returns the data saved in the database.
     * @param {FriendCreateManyAndReturnArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Friend.
     * @param {FriendDeleteArgs} args - Arguments to delete one Friend.
     * @example
     * // Delete one Friend
     * const Friend = await prisma.friend.delete({
     *   where: {
     *     // ... filter to delete one Friend
     *   }
     * })
     * 
     */
    delete<T extends FriendDeleteArgs>(args: SelectSubset<T, FriendDeleteArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Friend.
     * @param {FriendUpdateArgs} args - Arguments to update one Friend.
     * @example
     * // Update one Friend
     * const friend = await prisma.friend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendUpdateArgs>(args: SelectSubset<T, FriendUpdateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Friends.
     * @param {FriendDeleteManyArgs} args - Arguments to filter Friends to delete.
     * @example
     * // Delete a few Friends
     * const { count } = await prisma.friend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendDeleteManyArgs>(args?: SelectSubset<T, FriendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendUpdateManyArgs>(args: SelectSubset<T, FriendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends and returns the data updated in the database.
     * @param {FriendUpdateManyAndReturnArgs} args - Arguments to update many Friends.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Friend.
     * @param {FriendUpsertArgs} args - Arguments to update or create a Friend.
     * @example
     * // Update or create a Friend
     * const friend = await prisma.friend.upsert({
     *   create: {
     *     // ... data to create a Friend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friend we want to update
     *   }
     * })
     */
    upsert<T extends FriendUpsertArgs>(args: SelectSubset<T, FriendUpsertArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendCountArgs} args - Arguments to filter Friends to count.
     * @example
     * // Count the number of Friends
     * const count = await prisma.friend.count({
     *   where: {
     *     // ... the filter for the Friends we want to count
     *   }
     * })
    **/
    count<T extends FriendCountArgs>(
      args?: Subset<T, FriendCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendAggregateArgs>(args: Subset<T, FriendAggregateArgs>): Prisma.PrismaPromise<GetFriendAggregateType<T>>

    /**
     * Group by Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friend model
   */
  readonly fields: FriendFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friend.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    friend<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    userEvents<T extends Friend$userEventsArgs<ExtArgs> = {}>(args?: Subset<T, Friend$userEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friend model
   */ 
  interface FriendFieldRefs {
    readonly id: FieldRef<"Friend", 'Int'>
    readonly userId: FieldRef<"Friend", 'Int'>
    readonly friendId: FieldRef<"Friend", 'Int'>
    readonly status: FieldRef<"Friend", 'String'>
    readonly createdAt: FieldRef<"Friend", 'DateTime'>
    readonly deletedAt: FieldRef<"Friend", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Friend findUnique
   */
  export type FriendFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findUniqueOrThrow
   */
  export type FriendFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findFirst
   */
  export type FriendFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findFirstOrThrow
   */
  export type FriendFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findMany
   */
  export type FriendFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friends to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend create
   */
  export type FriendCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to create a Friend.
     */
    data: XOR<FriendCreateInput, FriendUncheckedCreateInput>
  }

  /**
   * Friend createMany
   */
  export type FriendCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friend createManyAndReturn
   */
  export type FriendCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend update
   */
  export type FriendUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to update a Friend.
     */
    data: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
    /**
     * Choose, which Friend to update.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend updateMany
   */
  export type FriendUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
  }

  /**
   * Friend updateManyAndReturn
   */
  export type FriendUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend upsert
   */
  export type FriendUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The filter to search for the Friend to update in case it exists.
     */
    where: FriendWhereUniqueInput
    /**
     * In case the Friend found by the `where` argument doesn't exist, create a new Friend with this data.
     */
    create: XOR<FriendCreateInput, FriendUncheckedCreateInput>
    /**
     * In case the Friend was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
  }

  /**
   * Friend delete
   */
  export type FriendDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter which Friend to delete.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend deleteMany
   */
  export type FriendDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friends to delete
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to delete.
     */
    limit?: number
  }

  /**
   * Friend.userEvents
   */
  export type Friend$userEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * Friend without action
   */
  export type FriendDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
  }


  /**
   * Model UserStats
   */

  export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  export type UserStatsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    xp: number | null
    level: number | null
    streak: number | null
  }

  export type UserStatsSumAggregateOutputType = {
    id: number | null
    userId: number | null
    xp: number | null
    level: number | null
    streak: number | null
  }

  export type UserStatsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    xp: number | null
    level: number | null
    streak: number | null
    lastPlayedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    xp: number | null
    level: number | null
    streak: number | null
    lastPlayedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsCountAggregateOutputType = {
    id: number
    userId: number
    xp: number
    level: number
    streak: number
    lastPlayedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserStatsAvgAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    streak?: true
  }

  export type UserStatsSumAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    streak?: true
  }

  export type UserStatsMinAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    streak?: true
    lastPlayedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    streak?: true
    lastPlayedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsCountAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    streak?: true
    lastPlayedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to aggregate.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStats
    **/
    _count?: true | UserStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStatsMaxAggregateInputType
  }

  export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStats[P]>
      : GetScalarType<T[P], AggregateUserStats[P]>
  }




  export type UserStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStatsWhereInput
    orderBy?: UserStatsOrderByWithAggregationInput | UserStatsOrderByWithAggregationInput[]
    by: UserStatsScalarFieldEnum[] | UserStatsScalarFieldEnum
    having?: UserStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStatsCountAggregateInputType | true
    _avg?: UserStatsAvgAggregateInputType
    _sum?: UserStatsSumAggregateInputType
    _min?: UserStatsMinAggregateInputType
    _max?: UserStatsMaxAggregateInputType
  }

  export type UserStatsGroupByOutputType = {
    id: number
    userId: number
    xp: number
    level: number
    streak: number
    lastPlayedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    lastPlayedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    lastPlayedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    lastPlayedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    streak?: boolean
    lastPlayedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "xp" | "level" | "streak" | "lastPlayedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userStats"]>
  export type UserStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      xp: number
      level: number
      streak: number
      lastPlayedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userStats"]>
    composites: {}
  }

  type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = $Result.GetResult<Prisma.$UserStatsPayload, S>

  type UserStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserStatsCountAggregateInputType | true
    }

  export interface UserStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStats'], meta: { name: 'UserStats' } }
    /**
     * Find zero or one UserStats that matches the filter.
     * @param {UserStatsFindUniqueArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStatsFindUniqueArgs>(args: SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UserStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserStatsFindUniqueOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStatsFindFirstArgs>(args?: SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UserStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStats
     * const userStats = await prisma.userStats.findMany()
     * 
     * // Get first 10 UserStats
     * const userStats = await prisma.userStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStatsWithIdOnly = await prisma.userStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStatsFindManyArgs>(args?: SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UserStats.
     * @param {UserStatsCreateArgs} args - Arguments to create a UserStats.
     * @example
     * // Create one UserStats
     * const UserStats = await prisma.userStats.create({
     *   data: {
     *     // ... data to create a UserStats
     *   }
     * })
     * 
     */
    create<T extends UserStatsCreateArgs>(args: SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UserStats.
     * @param {UserStatsCreateManyArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStatsCreateManyArgs>(args?: SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStats and returns the data saved in the database.
     * @param {UserStatsCreateManyAndReturnArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UserStats.
     * @param {UserStatsDeleteArgs} args - Arguments to delete one UserStats.
     * @example
     * // Delete one UserStats
     * const UserStats = await prisma.userStats.delete({
     *   where: {
     *     // ... filter to delete one UserStats
     *   }
     * })
     * 
     */
    delete<T extends UserStatsDeleteArgs>(args: SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UserStats.
     * @param {UserStatsUpdateArgs} args - Arguments to update one UserStats.
     * @example
     * // Update one UserStats
     * const userStats = await prisma.userStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStatsUpdateArgs>(args: SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UserStats.
     * @param {UserStatsDeleteManyArgs} args - Arguments to filter UserStats to delete.
     * @example
     * // Delete a few UserStats
     * const { count } = await prisma.userStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStatsUpdateManyArgs>(args: SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats and returns the data updated in the database.
     * @param {UserStatsUpdateManyAndReturnArgs} args - Arguments to update many UserStats.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one UserStats.
     * @param {UserStatsUpsertArgs} args - Arguments to update or create a UserStats.
     * @example
     * // Update or create a UserStats
     * const userStats = await prisma.userStats.upsert({
     *   create: {
     *     // ... data to create a UserStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStats we want to update
     *   }
     * })
     */
    upsert<T extends UserStatsUpsertArgs>(args: SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsCountArgs} args - Arguments to filter UserStats to count.
     * @example
     * // Count the number of UserStats
     * const count = await prisma.userStats.count({
     *   where: {
     *     // ... the filter for the UserStats we want to count
     *   }
     * })
    **/
    count<T extends UserStatsCountArgs>(
      args?: Subset<T, UserStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStatsAggregateArgs>(args: Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>

    /**
     * Group by UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStats model
   */
  readonly fields: UserStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStats model
   */ 
  interface UserStatsFieldRefs {
    readonly id: FieldRef<"UserStats", 'Int'>
    readonly userId: FieldRef<"UserStats", 'Int'>
    readonly xp: FieldRef<"UserStats", 'Int'>
    readonly level: FieldRef<"UserStats", 'Int'>
    readonly streak: FieldRef<"UserStats", 'Int'>
    readonly lastPlayedAt: FieldRef<"UserStats", 'DateTime'>
    readonly createdAt: FieldRef<"UserStats", 'DateTime'>
    readonly updatedAt: FieldRef<"UserStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserStats findUnique
   */
  export type UserStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findUniqueOrThrow
   */
  export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findFirst
   */
  export type UserStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findFirstOrThrow
   */
  export type UserStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findMany
   */
  export type UserStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats create
   */
  export type UserStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStats.
     */
    data: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
  }

  /**
   * UserStats createMany
   */
  export type UserStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats createManyAndReturn
   */
  export type UserStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats update
   */
  export type UserStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStats.
     */
    data: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
    /**
     * Choose, which UserStats to update.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats updateMany
   */
  export type UserStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
  }

  /**
   * UserStats updateManyAndReturn
   */
  export type UserStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats upsert
   */
  export type UserStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStats to update in case it exists.
     */
    where: UserStatsWhereUniqueInput
    /**
     * In case the UserStats found by the `where` argument doesn't exist, create a new UserStats with this data.
     */
    create: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
    /**
     * In case the UserStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
  }

  /**
   * UserStats delete
   */
  export type UserStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter which UserStats to delete.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats deleteMany
   */
  export type UserStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to delete
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to delete.
     */
    limit?: number
  }

  /**
   * UserStats without action
   */
  export type UserStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
  }


  /**
   * Model UserEvent
   */

  export type AggregateUserEvent = {
    _count: UserEventCountAggregateOutputType | null
    _avg: UserEventAvgAggregateOutputType | null
    _sum: UserEventSumAggregateOutputType | null
    _min: UserEventMinAggregateOutputType | null
    _max: UserEventMaxAggregateOutputType | null
  }

  export type UserEventAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    avatarAssetId: number | null
    friendId: number | null
    gameResultId: number | null
    levelUp: number | null
    attempts: number | null
  }

  export type UserEventSumAggregateOutputType = {
    id: number | null
    userId: number | null
    avatarAssetId: number | null
    friendId: number | null
    gameResultId: number | null
    levelUp: number | null
    attempts: number | null
  }

  export type UserEventMinAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    createdAt: Date | null
    avatarAssetId: number | null
    friendId: number | null
    gameResultId: number | null
    levelUp: number | null
    attempts: number | null
  }

  export type UserEventMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    createdAt: Date | null
    avatarAssetId: number | null
    friendId: number | null
    gameResultId: number | null
    levelUp: number | null
    attempts: number | null
  }

  export type UserEventCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    createdAt: number
    avatarAssetId: number
    friendId: number
    gameResultId: number
    levelUp: number
    attempts: number
    _all: number
  }


  export type UserEventAvgAggregateInputType = {
    id?: true
    userId?: true
    avatarAssetId?: true
    friendId?: true
    gameResultId?: true
    levelUp?: true
    attempts?: true
  }

  export type UserEventSumAggregateInputType = {
    id?: true
    userId?: true
    avatarAssetId?: true
    friendId?: true
    gameResultId?: true
    levelUp?: true
    attempts?: true
  }

  export type UserEventMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
    avatarAssetId?: true
    friendId?: true
    gameResultId?: true
    levelUp?: true
    attempts?: true
  }

  export type UserEventMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
    avatarAssetId?: true
    friendId?: true
    gameResultId?: true
    levelUp?: true
    attempts?: true
  }

  export type UserEventCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    createdAt?: true
    avatarAssetId?: true
    friendId?: true
    gameResultId?: true
    levelUp?: true
    attempts?: true
    _all?: true
  }

  export type UserEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEvent to aggregate.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserEvents
    **/
    _count?: true | UserEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserEventMaxAggregateInputType
  }

  export type GetUserEventAggregateType<T extends UserEventAggregateArgs> = {
        [P in keyof T & keyof AggregateUserEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserEvent[P]>
      : GetScalarType<T[P], AggregateUserEvent[P]>
  }




  export type UserEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithAggregationInput | UserEventOrderByWithAggregationInput[]
    by: UserEventScalarFieldEnum[] | UserEventScalarFieldEnum
    having?: UserEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserEventCountAggregateInputType | true
    _avg?: UserEventAvgAggregateInputType
    _sum?: UserEventSumAggregateInputType
    _min?: UserEventMinAggregateInputType
    _max?: UserEventMaxAggregateInputType
  }

  export type UserEventGroupByOutputType = {
    id: number
    userId: number
    type: string
    createdAt: Date
    avatarAssetId: number | null
    friendId: number | null
    gameResultId: number | null
    levelUp: number | null
    attempts: number | null
    _count: UserEventCountAggregateOutputType | null
    _avg: UserEventAvgAggregateOutputType | null
    _sum: UserEventSumAggregateOutputType | null
    _min: UserEventMinAggregateOutputType | null
    _max: UserEventMaxAggregateOutputType | null
  }

  type GetUserEventGroupByPayload<T extends UserEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserEventGroupByOutputType[P]>
            : GetScalarType<T[P], UserEventGroupByOutputType[P]>
        }
      >
    >


  export type UserEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    avatarAssetId?: boolean
    friendId?: boolean
    gameResultId?: boolean
    levelUp?: boolean
    attempts?: boolean
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    avatarAssetId?: boolean
    friendId?: boolean
    gameResultId?: boolean
    levelUp?: boolean
    attempts?: boolean
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    avatarAssetId?: boolean
    friendId?: boolean
    gameResultId?: boolean
    levelUp?: boolean
    attempts?: boolean
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    avatarAssetId?: boolean
    friendId?: boolean
    gameResultId?: boolean
    levelUp?: boolean
    attempts?: boolean
  }

  export type UserEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "createdAt" | "avatarAssetId" | "friendId" | "gameResultId" | "levelUp" | "attempts", ExtArgs["result"]["userEvent"]>
  export type UserEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatarAsset?: boolean | UserEvent$avatarAssetArgs<ExtArgs>
    friend?: boolean | UserEvent$friendArgs<ExtArgs>
    gameResult?: boolean | UserEvent$gameResultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserEvent"
    objects: {
      avatarAsset: Prisma.$AvatarAssetPayload<ExtArgs> | null
      friend: Prisma.$FriendPayload<ExtArgs> | null
      gameResult: Prisma.$GameResultPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      type: string
      createdAt: Date
      avatarAssetId: number | null
      friendId: number | null
      gameResultId: number | null
      levelUp: number | null
      attempts: number | null
    }, ExtArgs["result"]["userEvent"]>
    composites: {}
  }

  type UserEventGetPayload<S extends boolean | null | undefined | UserEventDefaultArgs> = $Result.GetResult<Prisma.$UserEventPayload, S>

  type UserEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserEventCountAggregateInputType | true
    }

  export interface UserEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserEvent'], meta: { name: 'UserEvent' } }
    /**
     * Find zero or one UserEvent that matches the filter.
     * @param {UserEventFindUniqueArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserEventFindUniqueArgs>(args: SelectSubset<T, UserEventFindUniqueArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UserEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserEventFindUniqueOrThrowArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserEventFindUniqueOrThrowArgs>(args: SelectSubset<T, UserEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UserEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindFirstArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserEventFindFirstArgs>(args?: SelectSubset<T, UserEventFindFirstArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UserEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindFirstOrThrowArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserEventFindFirstOrThrowArgs>(args?: SelectSubset<T, UserEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UserEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserEvents
     * const userEvents = await prisma.userEvent.findMany()
     * 
     * // Get first 10 UserEvents
     * const userEvents = await prisma.userEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userEventWithIdOnly = await prisma.userEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserEventFindManyArgs>(args?: SelectSubset<T, UserEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UserEvent.
     * @param {UserEventCreateArgs} args - Arguments to create a UserEvent.
     * @example
     * // Create one UserEvent
     * const UserEvent = await prisma.userEvent.create({
     *   data: {
     *     // ... data to create a UserEvent
     *   }
     * })
     * 
     */
    create<T extends UserEventCreateArgs>(args: SelectSubset<T, UserEventCreateArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UserEvents.
     * @param {UserEventCreateManyArgs} args - Arguments to create many UserEvents.
     * @example
     * // Create many UserEvents
     * const userEvent = await prisma.userEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserEventCreateManyArgs>(args?: SelectSubset<T, UserEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserEvents and returns the data saved in the database.
     * @param {UserEventCreateManyAndReturnArgs} args - Arguments to create many UserEvents.
     * @example
     * // Create many UserEvents
     * const userEvent = await prisma.userEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserEvents and only return the `id`
     * const userEventWithIdOnly = await prisma.userEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserEventCreateManyAndReturnArgs>(args?: SelectSubset<T, UserEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UserEvent.
     * @param {UserEventDeleteArgs} args - Arguments to delete one UserEvent.
     * @example
     * // Delete one UserEvent
     * const UserEvent = await prisma.userEvent.delete({
     *   where: {
     *     // ... filter to delete one UserEvent
     *   }
     * })
     * 
     */
    delete<T extends UserEventDeleteArgs>(args: SelectSubset<T, UserEventDeleteArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UserEvent.
     * @param {UserEventUpdateArgs} args - Arguments to update one UserEvent.
     * @example
     * // Update one UserEvent
     * const userEvent = await prisma.userEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserEventUpdateArgs>(args: SelectSubset<T, UserEventUpdateArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UserEvents.
     * @param {UserEventDeleteManyArgs} args - Arguments to filter UserEvents to delete.
     * @example
     * // Delete a few UserEvents
     * const { count } = await prisma.userEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserEventDeleteManyArgs>(args?: SelectSubset<T, UserEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserEvents
     * const userEvent = await prisma.userEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserEventUpdateManyArgs>(args: SelectSubset<T, UserEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEvents and returns the data updated in the database.
     * @param {UserEventUpdateManyAndReturnArgs} args - Arguments to update many UserEvents.
     * @example
     * // Update many UserEvents
     * const userEvent = await prisma.userEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserEvents and only return the `id`
     * const userEventWithIdOnly = await prisma.userEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserEventUpdateManyAndReturnArgs>(args: SelectSubset<T, UserEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one UserEvent.
     * @param {UserEventUpsertArgs} args - Arguments to update or create a UserEvent.
     * @example
     * // Update or create a UserEvent
     * const userEvent = await prisma.userEvent.upsert({
     *   create: {
     *     // ... data to create a UserEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserEvent we want to update
     *   }
     * })
     */
    upsert<T extends UserEventUpsertArgs>(args: SelectSubset<T, UserEventUpsertArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UserEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventCountArgs} args - Arguments to filter UserEvents to count.
     * @example
     * // Count the number of UserEvents
     * const count = await prisma.userEvent.count({
     *   where: {
     *     // ... the filter for the UserEvents we want to count
     *   }
     * })
    **/
    count<T extends UserEventCountArgs>(
      args?: Subset<T, UserEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserEventAggregateArgs>(args: Subset<T, UserEventAggregateArgs>): Prisma.PrismaPromise<GetUserEventAggregateType<T>>

    /**
     * Group by UserEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserEventGroupByArgs['orderBy'] }
        : { orderBy?: UserEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserEvent model
   */
  readonly fields: UserEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avatarAsset<T extends UserEvent$avatarAssetArgs<ExtArgs> = {}>(args?: Subset<T, UserEvent$avatarAssetArgs<ExtArgs>>): Prisma__AvatarAssetClient<$Result.GetResult<Prisma.$AvatarAssetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    friend<T extends UserEvent$friendArgs<ExtArgs> = {}>(args?: Subset<T, UserEvent$friendArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    gameResult<T extends UserEvent$gameResultArgs<ExtArgs> = {}>(args?: Subset<T, UserEvent$gameResultArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserEvent model
   */ 
  interface UserEventFieldRefs {
    readonly id: FieldRef<"UserEvent", 'Int'>
    readonly userId: FieldRef<"UserEvent", 'Int'>
    readonly type: FieldRef<"UserEvent", 'String'>
    readonly createdAt: FieldRef<"UserEvent", 'DateTime'>
    readonly avatarAssetId: FieldRef<"UserEvent", 'Int'>
    readonly friendId: FieldRef<"UserEvent", 'Int'>
    readonly gameResultId: FieldRef<"UserEvent", 'Int'>
    readonly levelUp: FieldRef<"UserEvent", 'Int'>
    readonly attempts: FieldRef<"UserEvent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserEvent findUnique
   */
  export type UserEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent findUniqueOrThrow
   */
  export type UserEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent findFirst
   */
  export type UserEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEvents.
     */
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent findFirstOrThrow
   */
  export type UserEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEvents.
     */
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent findMany
   */
  export type UserEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvents to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent create
   */
  export type UserEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The data needed to create a UserEvent.
     */
    data: XOR<UserEventCreateInput, UserEventUncheckedCreateInput>
  }

  /**
   * UserEvent createMany
   */
  export type UserEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserEvents.
     */
    data: UserEventCreateManyInput | UserEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserEvent createManyAndReturn
   */
  export type UserEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * The data used to create many UserEvents.
     */
    data: UserEventCreateManyInput | UserEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEvent update
   */
  export type UserEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The data needed to update a UserEvent.
     */
    data: XOR<UserEventUpdateInput, UserEventUncheckedUpdateInput>
    /**
     * Choose, which UserEvent to update.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent updateMany
   */
  export type UserEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserEvents.
     */
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyInput>
    /**
     * Filter which UserEvents to update
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to update.
     */
    limit?: number
  }

  /**
   * UserEvent updateManyAndReturn
   */
  export type UserEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * The data used to update UserEvents.
     */
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyInput>
    /**
     * Filter which UserEvents to update
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEvent upsert
   */
  export type UserEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The filter to search for the UserEvent to update in case it exists.
     */
    where: UserEventWhereUniqueInput
    /**
     * In case the UserEvent found by the `where` argument doesn't exist, create a new UserEvent with this data.
     */
    create: XOR<UserEventCreateInput, UserEventUncheckedCreateInput>
    /**
     * In case the UserEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserEventUpdateInput, UserEventUncheckedUpdateInput>
  }

  /**
   * UserEvent delete
   */
  export type UserEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter which UserEvent to delete.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent deleteMany
   */
  export type UserEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEvents to delete
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to delete.
     */
    limit?: number
  }

  /**
   * UserEvent.avatarAsset
   */
  export type UserEvent$avatarAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarAsset
     */
    select?: AvatarAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvatarAsset
     */
    omit?: AvatarAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarAssetInclude<ExtArgs> | null
    where?: AvatarAssetWhereInput
  }

  /**
   * UserEvent.friend
   */
  export type UserEvent$friendArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
  }

  /**
   * UserEvent.gameResult
   */
  export type UserEvent$gameResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    where?: GameResultWhereInput
  }

  /**
   * UserEvent without action
   */
  export type UserEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
  }


  /**
   * Model GameResult
   */

  export type AggregateGameResult = {
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  export type GameResultAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
    xpGained: number | null
  }

  export type GameResultSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
    xpGained: number | null
  }

  export type GameResultMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
    xpGained: number | null
    status: string | null
    date: Date | null
    deletedAt: Date | null
  }

  export type GameResultMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
    xpGained: number | null
    status: string | null
    date: Date | null
    deletedAt: Date | null
  }

  export type GameResultCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    score: number
    xpGained: number
    status: number
    date: number
    deletedAt: number
    _all: number
  }


  export type GameResultAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    xpGained?: true
  }

  export type GameResultSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    xpGained?: true
  }

  export type GameResultMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    xpGained?: true
    status?: true
    date?: true
    deletedAt?: true
  }

  export type GameResultMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    xpGained?: true
    status?: true
    date?: true
    deletedAt?: true
  }

  export type GameResultCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    xpGained?: true
    status?: true
    date?: true
    deletedAt?: true
    _all?: true
  }

  export type GameResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameResult to aggregate.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameResults
    **/
    _count?: true | GameResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameResultMaxAggregateInputType
  }

  export type GetGameResultAggregateType<T extends GameResultAggregateArgs> = {
        [P in keyof T & keyof AggregateGameResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameResult[P]>
      : GetScalarType<T[P], AggregateGameResult[P]>
  }




  export type GameResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameResultWhereInput
    orderBy?: GameResultOrderByWithAggregationInput | GameResultOrderByWithAggregationInput[]
    by: GameResultScalarFieldEnum[] | GameResultScalarFieldEnum
    having?: GameResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameResultCountAggregateInputType | true
    _avg?: GameResultAvgAggregateInputType
    _sum?: GameResultSumAggregateInputType
    _min?: GameResultMinAggregateInputType
    _max?: GameResultMaxAggregateInputType
  }

  export type GameResultGroupByOutputType = {
    id: number
    userId: number
    gameId: number
    score: number
    xpGained: number
    status: string
    date: Date
    deletedAt: Date | null
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  type GetGameResultGroupByPayload<T extends GameResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameResultGroupByOutputType[P]>
            : GetScalarType<T[P], GameResultGroupByOutputType[P]>
        }
      >
    >


  export type GameResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    xpGained?: boolean
    status?: boolean
    date?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    userEvents?: boolean | GameResult$userEventsArgs<ExtArgs>
    _count?: boolean | GameResultCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameResult"]>

  export type GameResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    xpGained?: boolean
    status?: boolean
    date?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameResult"]>

  export type GameResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    xpGained?: boolean
    status?: boolean
    date?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameResult"]>

  export type GameResultSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    xpGained?: boolean
    status?: boolean
    date?: boolean
    deletedAt?: boolean
  }

  export type GameResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "score" | "xpGained" | "status" | "date" | "deletedAt", ExtArgs["result"]["gameResult"]>
  export type GameResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    userEvents?: boolean | GameResult$userEventsArgs<ExtArgs>
    _count?: boolean | GameResultCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GameResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $GameResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameResult"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      game: Prisma.$GamePayload<ExtArgs>
      userEvents: Prisma.$UserEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      gameId: number
      score: number
      xpGained: number
      status: string
      date: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["gameResult"]>
    composites: {}
  }

  type GameResultGetPayload<S extends boolean | null | undefined | GameResultDefaultArgs> = $Result.GetResult<Prisma.$GameResultPayload, S>

  type GameResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameResultCountAggregateInputType | true
    }

  export interface GameResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameResult'], meta: { name: 'GameResult' } }
    /**
     * Find zero or one GameResult that matches the filter.
     * @param {GameResultFindUniqueArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameResultFindUniqueArgs>(args: SelectSubset<T, GameResultFindUniqueArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GameResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameResultFindUniqueOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameResultFindUniqueOrThrowArgs>(args: SelectSubset<T, GameResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GameResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameResultFindFirstArgs>(args?: SelectSubset<T, GameResultFindFirstArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GameResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameResultFindFirstOrThrowArgs>(args?: SelectSubset<T, GameResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GameResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameResults
     * const gameResults = await prisma.gameResult.findMany()
     * 
     * // Get first 10 GameResults
     * const gameResults = await prisma.gameResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameResultFindManyArgs>(args?: SelectSubset<T, GameResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GameResult.
     * @param {GameResultCreateArgs} args - Arguments to create a GameResult.
     * @example
     * // Create one GameResult
     * const GameResult = await prisma.gameResult.create({
     *   data: {
     *     // ... data to create a GameResult
     *   }
     * })
     * 
     */
    create<T extends GameResultCreateArgs>(args: SelectSubset<T, GameResultCreateArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GameResults.
     * @param {GameResultCreateManyArgs} args - Arguments to create many GameResults.
     * @example
     * // Create many GameResults
     * const gameResult = await prisma.gameResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameResultCreateManyArgs>(args?: SelectSubset<T, GameResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameResults and returns the data saved in the database.
     * @param {GameResultCreateManyAndReturnArgs} args - Arguments to create many GameResults.
     * @example
     * // Create many GameResults
     * const gameResult = await prisma.gameResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameResults and only return the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameResultCreateManyAndReturnArgs>(args?: SelectSubset<T, GameResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GameResult.
     * @param {GameResultDeleteArgs} args - Arguments to delete one GameResult.
     * @example
     * // Delete one GameResult
     * const GameResult = await prisma.gameResult.delete({
     *   where: {
     *     // ... filter to delete one GameResult
     *   }
     * })
     * 
     */
    delete<T extends GameResultDeleteArgs>(args: SelectSubset<T, GameResultDeleteArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GameResult.
     * @param {GameResultUpdateArgs} args - Arguments to update one GameResult.
     * @example
     * // Update one GameResult
     * const gameResult = await prisma.gameResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameResultUpdateArgs>(args: SelectSubset<T, GameResultUpdateArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GameResults.
     * @param {GameResultDeleteManyArgs} args - Arguments to filter GameResults to delete.
     * @example
     * // Delete a few GameResults
     * const { count } = await prisma.gameResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameResultDeleteManyArgs>(args?: SelectSubset<T, GameResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameResults
     * const gameResult = await prisma.gameResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameResultUpdateManyArgs>(args: SelectSubset<T, GameResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameResults and returns the data updated in the database.
     * @param {GameResultUpdateManyAndReturnArgs} args - Arguments to update many GameResults.
     * @example
     * // Update many GameResults
     * const gameResult = await prisma.gameResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameResults and only return the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameResultUpdateManyAndReturnArgs>(args: SelectSubset<T, GameResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GameResult.
     * @param {GameResultUpsertArgs} args - Arguments to update or create a GameResult.
     * @example
     * // Update or create a GameResult
     * const gameResult = await prisma.gameResult.upsert({
     *   create: {
     *     // ... data to create a GameResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameResult we want to update
     *   }
     * })
     */
    upsert<T extends GameResultUpsertArgs>(args: SelectSubset<T, GameResultUpsertArgs<ExtArgs>>): Prisma__GameResultClient<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultCountArgs} args - Arguments to filter GameResults to count.
     * @example
     * // Count the number of GameResults
     * const count = await prisma.gameResult.count({
     *   where: {
     *     // ... the filter for the GameResults we want to count
     *   }
     * })
    **/
    count<T extends GameResultCountArgs>(
      args?: Subset<T, GameResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameResultAggregateArgs>(args: Subset<T, GameResultAggregateArgs>): Prisma.PrismaPromise<GetGameResultAggregateType<T>>

    /**
     * Group by GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameResultGroupByArgs['orderBy'] }
        : { orderBy?: GameResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameResult model
   */
  readonly fields: GameResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    userEvents<T extends GameResult$userEventsArgs<ExtArgs> = {}>(args?: Subset<T, GameResult$userEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameResult model
   */ 
  interface GameResultFieldRefs {
    readonly id: FieldRef<"GameResult", 'Int'>
    readonly userId: FieldRef<"GameResult", 'Int'>
    readonly gameId: FieldRef<"GameResult", 'Int'>
    readonly score: FieldRef<"GameResult", 'Int'>
    readonly xpGained: FieldRef<"GameResult", 'Int'>
    readonly status: FieldRef<"GameResult", 'String'>
    readonly date: FieldRef<"GameResult", 'DateTime'>
    readonly deletedAt: FieldRef<"GameResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameResult findUnique
   */
  export type GameResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult findUniqueOrThrow
   */
  export type GameResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult findFirst
   */
  export type GameResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult findFirstOrThrow
   */
  export type GameResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult findMany
   */
  export type GameResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter, which GameResults to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * GameResult create
   */
  export type GameResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The data needed to create a GameResult.
     */
    data: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
  }

  /**
   * GameResult createMany
   */
  export type GameResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameResults.
     */
    data: GameResultCreateManyInput | GameResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameResult createManyAndReturn
   */
  export type GameResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * The data used to create many GameResults.
     */
    data: GameResultCreateManyInput | GameResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameResult update
   */
  export type GameResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The data needed to update a GameResult.
     */
    data: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
    /**
     * Choose, which GameResult to update.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult updateMany
   */
  export type GameResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameResults.
     */
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyInput>
    /**
     * Filter which GameResults to update
     */
    where?: GameResultWhereInput
    /**
     * Limit how many GameResults to update.
     */
    limit?: number
  }

  /**
   * GameResult updateManyAndReturn
   */
  export type GameResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * The data used to update GameResults.
     */
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyInput>
    /**
     * Filter which GameResults to update
     */
    where?: GameResultWhereInput
    /**
     * Limit how many GameResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameResult upsert
   */
  export type GameResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * The filter to search for the GameResult to update in case it exists.
     */
    where: GameResultWhereUniqueInput
    /**
     * In case the GameResult found by the `where` argument doesn't exist, create a new GameResult with this data.
     */
    create: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
    /**
     * In case the GameResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
  }

  /**
   * GameResult delete
   */
  export type GameResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    /**
     * Filter which GameResult to delete.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult deleteMany
   */
  export type GameResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameResults to delete
     */
    where?: GameResultWhereInput
    /**
     * Limit how many GameResults to delete.
     */
    limit?: number
  }

  /**
   * GameResult.userEvents
   */
  export type GameResult$userEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * GameResult without action
   */
  export type GameResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    gameCategoryId: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    gameCategoryId: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imgUrl: string | null
    path: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    gameCategoryId: number | null
    status: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imgUrl: string | null
    path: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    gameCategoryId: number | null
    status: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    name: number
    description: number
    imgUrl: number
    path: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    gameCategoryId: number
    status: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    gameCategoryId?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    gameCategoryId?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imgUrl?: true
    path?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    gameCategoryId?: true
    status?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imgUrl?: true
    path?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    gameCategoryId?: true
    status?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imgUrl?: true
    path?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    gameCategoryId?: true
    status?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    name: string
    description: string
    imgUrl: string | null
    path: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    gameCategoryId: number
    status: string
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imgUrl?: boolean
    path?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    gameCategoryId?: boolean
    status?: boolean
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
    results?: boolean | Game$resultsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imgUrl?: boolean
    path?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    gameCategoryId?: boolean
    status?: boolean
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imgUrl?: boolean
    path?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    gameCategoryId?: boolean
    status?: boolean
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    imgUrl?: boolean
    path?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    gameCategoryId?: boolean
    status?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "imgUrl" | "path" | "createdAt" | "updatedAt" | "deletedAt" | "gameCategoryId" | "status", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
    results?: boolean | Game$resultsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameCategory?: boolean | GameCategoryDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      gameCategory: Prisma.$GameCategoryPayload<ExtArgs>
      results: Prisma.$GameResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      imgUrl: string | null
      path: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      gameCategoryId: number
      status: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gameCategory<T extends GameCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameCategoryDefaultArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    results<T extends Game$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Game$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameResultPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */ 
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly name: FieldRef<"Game", 'String'>
    readonly description: FieldRef<"Game", 'String'>
    readonly imgUrl: FieldRef<"Game", 'String'>
    readonly path: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
    readonly deletedAt: FieldRef<"Game", 'DateTime'>
    readonly gameCategoryId: FieldRef<"Game", 'Int'>
    readonly status: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.results
   */
  export type Game$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameResult
     */
    omit?: GameResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameResultInclude<ExtArgs> | null
    where?: GameResultWhereInput
    orderBy?: GameResultOrderByWithRelationInput | GameResultOrderByWithRelationInput[]
    cursor?: GameResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameResultScalarFieldEnum | GameResultScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model GameCategory
   */

  export type AggregateGameCategory = {
    _count: GameCategoryCountAggregateOutputType | null
    _avg: GameCategoryAvgAggregateOutputType | null
    _sum: GameCategorySumAggregateOutputType | null
    _min: GameCategoryMinAggregateOutputType | null
    _max: GameCategoryMaxAggregateOutputType | null
  }

  export type GameCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type GameCategorySumAggregateOutputType = {
    id: number | null
  }

  export type GameCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    color: string | null
  }

  export type GameCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    color: string | null
  }

  export type GameCategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    color: number
    _all: number
  }


  export type GameCategoryAvgAggregateInputType = {
    id?: true
  }

  export type GameCategorySumAggregateInputType = {
    id?: true
  }

  export type GameCategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    color?: true
  }

  export type GameCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    color?: true
  }

  export type GameCategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    color?: true
    _all?: true
  }

  export type GameCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCategory to aggregate.
     */
    where?: GameCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCategories to fetch.
     */
    orderBy?: GameCategoryOrderByWithRelationInput | GameCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameCategories
    **/
    _count?: true | GameCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameCategoryMaxAggregateInputType
  }

  export type GetGameCategoryAggregateType<T extends GameCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateGameCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameCategory[P]>
      : GetScalarType<T[P], AggregateGameCategory[P]>
  }




  export type GameCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameCategoryWhereInput
    orderBy?: GameCategoryOrderByWithAggregationInput | GameCategoryOrderByWithAggregationInput[]
    by: GameCategoryScalarFieldEnum[] | GameCategoryScalarFieldEnum
    having?: GameCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCategoryCountAggregateInputType | true
    _avg?: GameCategoryAvgAggregateInputType
    _sum?: GameCategorySumAggregateInputType
    _min?: GameCategoryMinAggregateInputType
    _max?: GameCategoryMaxAggregateInputType
  }

  export type GameCategoryGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    color: string | null
    _count: GameCategoryCountAggregateOutputType | null
    _avg: GameCategoryAvgAggregateOutputType | null
    _sum: GameCategorySumAggregateOutputType | null
    _min: GameCategoryMinAggregateOutputType | null
    _max: GameCategoryMaxAggregateOutputType | null
  }

  type GetGameCategoryGroupByPayload<T extends GameCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], GameCategoryGroupByOutputType[P]>
        }
      >
    >


  export type GameCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    color?: boolean
    games?: boolean | GameCategory$gamesArgs<ExtArgs>
    _count?: boolean | GameCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCategory"]>

  export type GameCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    color?: boolean
  }, ExtArgs["result"]["gameCategory"]>

  export type GameCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    color?: boolean
  }, ExtArgs["result"]["gameCategory"]>

  export type GameCategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    color?: boolean
  }

  export type GameCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "deletedAt" | "color", ExtArgs["result"]["gameCategory"]>
  export type GameCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | GameCategory$gamesArgs<ExtArgs>
    _count?: boolean | GameCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GameCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameCategory"
    objects: {
      games: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      color: string | null
    }, ExtArgs["result"]["gameCategory"]>
    composites: {}
  }

  type GameCategoryGetPayload<S extends boolean | null | undefined | GameCategoryDefaultArgs> = $Result.GetResult<Prisma.$GameCategoryPayload, S>

  type GameCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCategoryCountAggregateInputType | true
    }

  export interface GameCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameCategory'], meta: { name: 'GameCategory' } }
    /**
     * Find zero or one GameCategory that matches the filter.
     * @param {GameCategoryFindUniqueArgs} args - Arguments to find a GameCategory
     * @example
     * // Get one GameCategory
     * const gameCategory = await prisma.gameCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameCategoryFindUniqueArgs>(args: SelectSubset<T, GameCategoryFindUniqueArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GameCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameCategoryFindUniqueOrThrowArgs} args - Arguments to find a GameCategory
     * @example
     * // Get one GameCategory
     * const gameCategory = await prisma.gameCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, GameCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GameCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryFindFirstArgs} args - Arguments to find a GameCategory
     * @example
     * // Get one GameCategory
     * const gameCategory = await prisma.gameCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameCategoryFindFirstArgs>(args?: SelectSubset<T, GameCategoryFindFirstArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GameCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryFindFirstOrThrowArgs} args - Arguments to find a GameCategory
     * @example
     * // Get one GameCategory
     * const gameCategory = await prisma.gameCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, GameCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GameCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameCategories
     * const gameCategories = await prisma.gameCategory.findMany()
     * 
     * // Get first 10 GameCategories
     * const gameCategories = await prisma.gameCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameCategoryWithIdOnly = await prisma.gameCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameCategoryFindManyArgs>(args?: SelectSubset<T, GameCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GameCategory.
     * @param {GameCategoryCreateArgs} args - Arguments to create a GameCategory.
     * @example
     * // Create one GameCategory
     * const GameCategory = await prisma.gameCategory.create({
     *   data: {
     *     // ... data to create a GameCategory
     *   }
     * })
     * 
     */
    create<T extends GameCategoryCreateArgs>(args: SelectSubset<T, GameCategoryCreateArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GameCategories.
     * @param {GameCategoryCreateManyArgs} args - Arguments to create many GameCategories.
     * @example
     * // Create many GameCategories
     * const gameCategory = await prisma.gameCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCategoryCreateManyArgs>(args?: SelectSubset<T, GameCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameCategories and returns the data saved in the database.
     * @param {GameCategoryCreateManyAndReturnArgs} args - Arguments to create many GameCategories.
     * @example
     * // Create many GameCategories
     * const gameCategory = await prisma.gameCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameCategories and only return the `id`
     * const gameCategoryWithIdOnly = await prisma.gameCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GameCategory.
     * @param {GameCategoryDeleteArgs} args - Arguments to delete one GameCategory.
     * @example
     * // Delete one GameCategory
     * const GameCategory = await prisma.gameCategory.delete({
     *   where: {
     *     // ... filter to delete one GameCategory
     *   }
     * })
     * 
     */
    delete<T extends GameCategoryDeleteArgs>(args: SelectSubset<T, GameCategoryDeleteArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GameCategory.
     * @param {GameCategoryUpdateArgs} args - Arguments to update one GameCategory.
     * @example
     * // Update one GameCategory
     * const gameCategory = await prisma.gameCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameCategoryUpdateArgs>(args: SelectSubset<T, GameCategoryUpdateArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GameCategories.
     * @param {GameCategoryDeleteManyArgs} args - Arguments to filter GameCategories to delete.
     * @example
     * // Delete a few GameCategories
     * const { count } = await prisma.gameCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameCategoryDeleteManyArgs>(args?: SelectSubset<T, GameCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameCategories
     * const gameCategory = await prisma.gameCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameCategoryUpdateManyArgs>(args: SelectSubset<T, GameCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCategories and returns the data updated in the database.
     * @param {GameCategoryUpdateManyAndReturnArgs} args - Arguments to update many GameCategories.
     * @example
     * // Update many GameCategories
     * const gameCategory = await prisma.gameCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameCategories and only return the `id`
     * const gameCategoryWithIdOnly = await prisma.gameCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, GameCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GameCategory.
     * @param {GameCategoryUpsertArgs} args - Arguments to update or create a GameCategory.
     * @example
     * // Update or create a GameCategory
     * const gameCategory = await prisma.gameCategory.upsert({
     *   create: {
     *     // ... data to create a GameCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameCategory we want to update
     *   }
     * })
     */
    upsert<T extends GameCategoryUpsertArgs>(args: SelectSubset<T, GameCategoryUpsertArgs<ExtArgs>>): Prisma__GameCategoryClient<$Result.GetResult<Prisma.$GameCategoryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GameCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryCountArgs} args - Arguments to filter GameCategories to count.
     * @example
     * // Count the number of GameCategories
     * const count = await prisma.gameCategory.count({
     *   where: {
     *     // ... the filter for the GameCategories we want to count
     *   }
     * })
    **/
    count<T extends GameCategoryCountArgs>(
      args?: Subset<T, GameCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameCategoryAggregateArgs>(args: Subset<T, GameCategoryAggregateArgs>): Prisma.PrismaPromise<GetGameCategoryAggregateType<T>>

    /**
     * Group by GameCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameCategoryGroupByArgs['orderBy'] }
        : { orderBy?: GameCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameCategory model
   */
  readonly fields: GameCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    games<T extends GameCategory$gamesArgs<ExtArgs> = {}>(args?: Subset<T, GameCategory$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameCategory model
   */ 
  interface GameCategoryFieldRefs {
    readonly id: FieldRef<"GameCategory", 'Int'>
    readonly name: FieldRef<"GameCategory", 'String'>
    readonly createdAt: FieldRef<"GameCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"GameCategory", 'DateTime'>
    readonly deletedAt: FieldRef<"GameCategory", 'DateTime'>
    readonly color: FieldRef<"GameCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GameCategory findUnique
   */
  export type GameCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GameCategory to fetch.
     */
    where: GameCategoryWhereUniqueInput
  }

  /**
   * GameCategory findUniqueOrThrow
   */
  export type GameCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GameCategory to fetch.
     */
    where: GameCategoryWhereUniqueInput
  }

  /**
   * GameCategory findFirst
   */
  export type GameCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GameCategory to fetch.
     */
    where?: GameCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCategories to fetch.
     */
    orderBy?: GameCategoryOrderByWithRelationInput | GameCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCategories.
     */
    cursor?: GameCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCategories.
     */
    distinct?: GameCategoryScalarFieldEnum | GameCategoryScalarFieldEnum[]
  }

  /**
   * GameCategory findFirstOrThrow
   */
  export type GameCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GameCategory to fetch.
     */
    where?: GameCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCategories to fetch.
     */
    orderBy?: GameCategoryOrderByWithRelationInput | GameCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCategories.
     */
    cursor?: GameCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCategories.
     */
    distinct?: GameCategoryScalarFieldEnum | GameCategoryScalarFieldEnum[]
  }

  /**
   * GameCategory findMany
   */
  export type GameCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter, which GameCategories to fetch.
     */
    where?: GameCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCategories to fetch.
     */
    orderBy?: GameCategoryOrderByWithRelationInput | GameCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameCategories.
     */
    cursor?: GameCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCategories.
     */
    skip?: number
    distinct?: GameCategoryScalarFieldEnum | GameCategoryScalarFieldEnum[]
  }

  /**
   * GameCategory create
   */
  export type GameCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a GameCategory.
     */
    data: XOR<GameCategoryCreateInput, GameCategoryUncheckedCreateInput>
  }

  /**
   * GameCategory createMany
   */
  export type GameCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameCategories.
     */
    data: GameCategoryCreateManyInput | GameCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameCategory createManyAndReturn
   */
  export type GameCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many GameCategories.
     */
    data: GameCategoryCreateManyInput | GameCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameCategory update
   */
  export type GameCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a GameCategory.
     */
    data: XOR<GameCategoryUpdateInput, GameCategoryUncheckedUpdateInput>
    /**
     * Choose, which GameCategory to update.
     */
    where: GameCategoryWhereUniqueInput
  }

  /**
   * GameCategory updateMany
   */
  export type GameCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameCategories.
     */
    data: XOR<GameCategoryUpdateManyMutationInput, GameCategoryUncheckedUpdateManyInput>
    /**
     * Filter which GameCategories to update
     */
    where?: GameCategoryWhereInput
    /**
     * Limit how many GameCategories to update.
     */
    limit?: number
  }

  /**
   * GameCategory updateManyAndReturn
   */
  export type GameCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * The data used to update GameCategories.
     */
    data: XOR<GameCategoryUpdateManyMutationInput, GameCategoryUncheckedUpdateManyInput>
    /**
     * Filter which GameCategories to update
     */
    where?: GameCategoryWhereInput
    /**
     * Limit how many GameCategories to update.
     */
    limit?: number
  }

  /**
   * GameCategory upsert
   */
  export type GameCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the GameCategory to update in case it exists.
     */
    where: GameCategoryWhereUniqueInput
    /**
     * In case the GameCategory found by the `where` argument doesn't exist, create a new GameCategory with this data.
     */
    create: XOR<GameCategoryCreateInput, GameCategoryUncheckedCreateInput>
    /**
     * In case the GameCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameCategoryUpdateInput, GameCategoryUncheckedUpdateInput>
  }

  /**
   * GameCategory delete
   */
  export type GameCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
    /**
     * Filter which GameCategory to delete.
     */
    where: GameCategoryWhereUniqueInput
  }

  /**
   * GameCategory deleteMany
   */
  export type GameCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCategories to delete
     */
    where?: GameCategoryWhereInput
    /**
     * Limit how many GameCategories to delete.
     */
    limit?: number
  }

  /**
   * GameCategory.games
   */
  export type GameCategory$gamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * GameCategory without action
   */
  export type GameCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCategory
     */
    select?: GameCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCategory
     */
    omit?: GameCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCategoryInclude<ExtArgs> | null
  }


  /**
   * Model DataMovie
   */

  export type AggregateDataMovie = {
    _count: DataMovieCountAggregateOutputType | null
    _avg: DataMovieAvgAggregateOutputType | null
    _sum: DataMovieSumAggregateOutputType | null
    _min: DataMovieMinAggregateOutputType | null
    _max: DataMovieMaxAggregateOutputType | null
  }

  export type DataMovieAvgAggregateOutputType = {
    id: number | null
    tmdbId: number | null
    year: number | null
    runtime: number | null
    voteAverage: number | null
    voteCount: number | null
    popularity: number | null
    budget: number | null
  }

  export type DataMovieSumAggregateOutputType = {
    id: number | null
    tmdbId: number | null
    year: number | null
    runtime: number | null
    voteAverage: number | null
    voteCount: number | null
    popularity: number | null
    budget: number | null
  }

  export type DataMovieMinAggregateOutputType = {
    id: number | null
    tmdbId: number | null
    title: string | null
    originalTitle: string | null
    year: number | null
    releaseDate: Date | null
    runtime: number | null
    director: string | null
    actors: string | null
    genres: string | null
    synopsis: string | null
    production: string | null
    country: string | null
    language: string | null
    voteAverage: number | null
    voteCount: number | null
    popularity: number | null
    budget: number | null
    keywords: string | null
    posterPath: string | null
    backdropPath: string | null
    image1: string | null
    image2: string | null
    image3: string | null
    image4: string | null
    image5: string | null
    image6: string | null
    image7: string | null
    image8: string | null
    image9: string | null
    image10: string | null
    createdAt: Date | null
  }

  export type DataMovieMaxAggregateOutputType = {
    id: number | null
    tmdbId: number | null
    title: string | null
    originalTitle: string | null
    year: number | null
    releaseDate: Date | null
    runtime: number | null
    director: string | null
    actors: string | null
    genres: string | null
    synopsis: string | null
    production: string | null
    country: string | null
    language: string | null
    voteAverage: number | null
    voteCount: number | null
    popularity: number | null
    budget: number | null
    keywords: string | null
    posterPath: string | null
    backdropPath: string | null
    image1: string | null
    image2: string | null
    image3: string | null
    image4: string | null
    image5: string | null
    image6: string | null
    image7: string | null
    image8: string | null
    image9: string | null
    image10: string | null
    createdAt: Date | null
  }

  export type DataMovieCountAggregateOutputType = {
    id: number
    tmdbId: number
    title: number
    originalTitle: number
    year: number
    releaseDate: number
    runtime: number
    director: number
    actors: number
    genres: number
    synopsis: number
    production: number
    country: number
    language: number
    voteAverage: number
    voteCount: number
    popularity: number
    budget: number
    keywords: number
    posterPath: number
    backdropPath: number
    image1: number
    image2: number
    image3: number
    image4: number
    image5: number
    image6: number
    image7: number
    image8: number
    image9: number
    image10: number
    createdAt: number
    _all: number
  }


  export type DataMovieAvgAggregateInputType = {
    id?: true
    tmdbId?: true
    year?: true
    runtime?: true
    voteAverage?: true
    voteCount?: true
    popularity?: true
    budget?: true
  }

  export type DataMovieSumAggregateInputType = {
    id?: true
    tmdbId?: true
    year?: true
    runtime?: true
    voteAverage?: true
    voteCount?: true
    popularity?: true
    budget?: true
  }

  export type DataMovieMinAggregateInputType = {
    id?: true
    tmdbId?: true
    title?: true
    originalTitle?: true
    year?: true
    releaseDate?: true
    runtime?: true
    director?: true
    actors?: true
    genres?: true
    synopsis?: true
    production?: true
    country?: true
    language?: true
    voteAverage?: true
    voteCount?: true
    popularity?: true
    budget?: true
    keywords?: true
    posterPath?: true
    backdropPath?: true
    image1?: true
    image2?: true
    image3?: true
    image4?: true
    image5?: true
    image6?: true
    image7?: true
    image8?: true
    image9?: true
    image10?: true
    createdAt?: true
  }

  export type DataMovieMaxAggregateInputType = {
    id?: true
    tmdbId?: true
    title?: true
    originalTitle?: true
    year?: true
    releaseDate?: true
    runtime?: true
    director?: true
    actors?: true
    genres?: true
    synopsis?: true
    production?: true
    country?: true
    language?: true
    voteAverage?: true
    voteCount?: true
    popularity?: true
    budget?: true
    keywords?: true
    posterPath?: true
    backdropPath?: true
    image1?: true
    image2?: true
    image3?: true
    image4?: true
    image5?: true
    image6?: true
    image7?: true
    image8?: true
    image9?: true
    image10?: true
    createdAt?: true
  }

  export type DataMovieCountAggregateInputType = {
    id?: true
    tmdbId?: true
    title?: true
    originalTitle?: true
    year?: true
    releaseDate?: true
    runtime?: true
    director?: true
    actors?: true
    genres?: true
    synopsis?: true
    production?: true
    country?: true
    language?: true
    voteAverage?: true
    voteCount?: true
    popularity?: true
    budget?: true
    keywords?: true
    posterPath?: true
    backdropPath?: true
    image1?: true
    image2?: true
    image3?: true
    image4?: true
    image5?: true
    image6?: true
    image7?: true
    image8?: true
    image9?: true
    image10?: true
    createdAt?: true
    _all?: true
  }

  export type DataMovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataMovie to aggregate.
     */
    where?: DataMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMovies to fetch.
     */
    orderBy?: DataMovieOrderByWithRelationInput | DataMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataMovies
    **/
    _count?: true | DataMovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataMovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataMovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataMovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataMovieMaxAggregateInputType
  }

  export type GetDataMovieAggregateType<T extends DataMovieAggregateArgs> = {
        [P in keyof T & keyof AggregateDataMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataMovie[P]>
      : GetScalarType<T[P], AggregateDataMovie[P]>
  }




  export type DataMovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataMovieWhereInput
    orderBy?: DataMovieOrderByWithAggregationInput | DataMovieOrderByWithAggregationInput[]
    by: DataMovieScalarFieldEnum[] | DataMovieScalarFieldEnum
    having?: DataMovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataMovieCountAggregateInputType | true
    _avg?: DataMovieAvgAggregateInputType
    _sum?: DataMovieSumAggregateInputType
    _min?: DataMovieMinAggregateInputType
    _max?: DataMovieMaxAggregateInputType
  }

  export type DataMovieGroupByOutputType = {
    id: number
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date
    runtime: number | null
    director: string | null
    actors: string | null
    genres: string
    synopsis: string | null
    production: string | null
    country: string | null
    language: string | null
    voteAverage: number | null
    voteCount: number | null
    popularity: number | null
    budget: number | null
    keywords: string | null
    posterPath: string | null
    backdropPath: string | null
    image1: string | null
    image2: string | null
    image3: string | null
    image4: string | null
    image5: string | null
    image6: string | null
    image7: string | null
    image8: string | null
    image9: string | null
    image10: string | null
    createdAt: Date
    _count: DataMovieCountAggregateOutputType | null
    _avg: DataMovieAvgAggregateOutputType | null
    _sum: DataMovieSumAggregateOutputType | null
    _min: DataMovieMinAggregateOutputType | null
    _max: DataMovieMaxAggregateOutputType | null
  }

  type GetDataMovieGroupByPayload<T extends DataMovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataMovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataMovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataMovieGroupByOutputType[P]>
            : GetScalarType<T[P], DataMovieGroupByOutputType[P]>
        }
      >
    >


  export type DataMovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tmdbId?: boolean
    title?: boolean
    originalTitle?: boolean
    year?: boolean
    releaseDate?: boolean
    runtime?: boolean
    director?: boolean
    actors?: boolean
    genres?: boolean
    synopsis?: boolean
    production?: boolean
    country?: boolean
    language?: boolean
    voteAverage?: boolean
    voteCount?: boolean
    popularity?: boolean
    budget?: boolean
    keywords?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    image1?: boolean
    image2?: boolean
    image3?: boolean
    image4?: boolean
    image5?: boolean
    image6?: boolean
    image7?: boolean
    image8?: boolean
    image9?: boolean
    image10?: boolean
    createdAt?: boolean
    gameDays?: boolean | DataMovie$gameDaysArgs<ExtArgs>
    _count?: boolean | DataMovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMovie"]>

  export type DataMovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tmdbId?: boolean
    title?: boolean
    originalTitle?: boolean
    year?: boolean
    releaseDate?: boolean
    runtime?: boolean
    director?: boolean
    actors?: boolean
    genres?: boolean
    synopsis?: boolean
    production?: boolean
    country?: boolean
    language?: boolean
    voteAverage?: boolean
    voteCount?: boolean
    popularity?: boolean
    budget?: boolean
    keywords?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    image1?: boolean
    image2?: boolean
    image3?: boolean
    image4?: boolean
    image5?: boolean
    image6?: boolean
    image7?: boolean
    image8?: boolean
    image9?: boolean
    image10?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dataMovie"]>

  export type DataMovieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tmdbId?: boolean
    title?: boolean
    originalTitle?: boolean
    year?: boolean
    releaseDate?: boolean
    runtime?: boolean
    director?: boolean
    actors?: boolean
    genres?: boolean
    synopsis?: boolean
    production?: boolean
    country?: boolean
    language?: boolean
    voteAverage?: boolean
    voteCount?: boolean
    popularity?: boolean
    budget?: boolean
    keywords?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    image1?: boolean
    image2?: boolean
    image3?: boolean
    image4?: boolean
    image5?: boolean
    image6?: boolean
    image7?: boolean
    image8?: boolean
    image9?: boolean
    image10?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dataMovie"]>

  export type DataMovieSelectScalar = {
    id?: boolean
    tmdbId?: boolean
    title?: boolean
    originalTitle?: boolean
    year?: boolean
    releaseDate?: boolean
    runtime?: boolean
    director?: boolean
    actors?: boolean
    genres?: boolean
    synopsis?: boolean
    production?: boolean
    country?: boolean
    language?: boolean
    voteAverage?: boolean
    voteCount?: boolean
    popularity?: boolean
    budget?: boolean
    keywords?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    image1?: boolean
    image2?: boolean
    image3?: boolean
    image4?: boolean
    image5?: boolean
    image6?: boolean
    image7?: boolean
    image8?: boolean
    image9?: boolean
    image10?: boolean
    createdAt?: boolean
  }

  export type DataMovieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tmdbId" | "title" | "originalTitle" | "year" | "releaseDate" | "runtime" | "director" | "actors" | "genres" | "synopsis" | "production" | "country" | "language" | "voteAverage" | "voteCount" | "popularity" | "budget" | "keywords" | "posterPath" | "backdropPath" | "image1" | "image2" | "image3" | "image4" | "image5" | "image6" | "image7" | "image8" | "image9" | "image10" | "createdAt", ExtArgs["result"]["dataMovie"]>
  export type DataMovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameDays?: boolean | DataMovie$gameDaysArgs<ExtArgs>
    _count?: boolean | DataMovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DataMovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DataMovieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DataMoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataMovie"
    objects: {
      gameDays: Prisma.$GameCinema1DaysPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tmdbId: number
      title: string
      originalTitle: string
      year: number
      releaseDate: Date
      runtime: number | null
      director: string | null
      actors: string | null
      genres: string
      synopsis: string | null
      production: string | null
      country: string | null
      language: string | null
      voteAverage: number | null
      voteCount: number | null
      popularity: number | null
      budget: number | null
      keywords: string | null
      posterPath: string | null
      backdropPath: string | null
      image1: string | null
      image2: string | null
      image3: string | null
      image4: string | null
      image5: string | null
      image6: string | null
      image7: string | null
      image8: string | null
      image9: string | null
      image10: string | null
      createdAt: Date
    }, ExtArgs["result"]["dataMovie"]>
    composites: {}
  }

  type DataMovieGetPayload<S extends boolean | null | undefined | DataMovieDefaultArgs> = $Result.GetResult<Prisma.$DataMoviePayload, S>

  type DataMovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataMovieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataMovieCountAggregateInputType | true
    }

  export interface DataMovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataMovie'], meta: { name: 'DataMovie' } }
    /**
     * Find zero or one DataMovie that matches the filter.
     * @param {DataMovieFindUniqueArgs} args - Arguments to find a DataMovie
     * @example
     * // Get one DataMovie
     * const dataMovie = await prisma.dataMovie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataMovieFindUniqueArgs>(args: SelectSubset<T, DataMovieFindUniqueArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one DataMovie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataMovieFindUniqueOrThrowArgs} args - Arguments to find a DataMovie
     * @example
     * // Get one DataMovie
     * const dataMovie = await prisma.dataMovie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataMovieFindUniqueOrThrowArgs>(args: SelectSubset<T, DataMovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first DataMovie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieFindFirstArgs} args - Arguments to find a DataMovie
     * @example
     * // Get one DataMovie
     * const dataMovie = await prisma.dataMovie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataMovieFindFirstArgs>(args?: SelectSubset<T, DataMovieFindFirstArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first DataMovie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieFindFirstOrThrowArgs} args - Arguments to find a DataMovie
     * @example
     * // Get one DataMovie
     * const dataMovie = await prisma.dataMovie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataMovieFindFirstOrThrowArgs>(args?: SelectSubset<T, DataMovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more DataMovies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataMovies
     * const dataMovies = await prisma.dataMovie.findMany()
     * 
     * // Get first 10 DataMovies
     * const dataMovies = await prisma.dataMovie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dataMovieWithIdOnly = await prisma.dataMovie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DataMovieFindManyArgs>(args?: SelectSubset<T, DataMovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a DataMovie.
     * @param {DataMovieCreateArgs} args - Arguments to create a DataMovie.
     * @example
     * // Create one DataMovie
     * const DataMovie = await prisma.dataMovie.create({
     *   data: {
     *     // ... data to create a DataMovie
     *   }
     * })
     * 
     */
    create<T extends DataMovieCreateArgs>(args: SelectSubset<T, DataMovieCreateArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many DataMovies.
     * @param {DataMovieCreateManyArgs} args - Arguments to create many DataMovies.
     * @example
     * // Create many DataMovies
     * const dataMovie = await prisma.dataMovie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataMovieCreateManyArgs>(args?: SelectSubset<T, DataMovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataMovies and returns the data saved in the database.
     * @param {DataMovieCreateManyAndReturnArgs} args - Arguments to create many DataMovies.
     * @example
     * // Create many DataMovies
     * const dataMovie = await prisma.dataMovie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataMovies and only return the `id`
     * const dataMovieWithIdOnly = await prisma.dataMovie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataMovieCreateManyAndReturnArgs>(args?: SelectSubset<T, DataMovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a DataMovie.
     * @param {DataMovieDeleteArgs} args - Arguments to delete one DataMovie.
     * @example
     * // Delete one DataMovie
     * const DataMovie = await prisma.dataMovie.delete({
     *   where: {
     *     // ... filter to delete one DataMovie
     *   }
     * })
     * 
     */
    delete<T extends DataMovieDeleteArgs>(args: SelectSubset<T, DataMovieDeleteArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one DataMovie.
     * @param {DataMovieUpdateArgs} args - Arguments to update one DataMovie.
     * @example
     * // Update one DataMovie
     * const dataMovie = await prisma.dataMovie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataMovieUpdateArgs>(args: SelectSubset<T, DataMovieUpdateArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more DataMovies.
     * @param {DataMovieDeleteManyArgs} args - Arguments to filter DataMovies to delete.
     * @example
     * // Delete a few DataMovies
     * const { count } = await prisma.dataMovie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataMovieDeleteManyArgs>(args?: SelectSubset<T, DataMovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataMovies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataMovies
     * const dataMovie = await prisma.dataMovie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataMovieUpdateManyArgs>(args: SelectSubset<T, DataMovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataMovies and returns the data updated in the database.
     * @param {DataMovieUpdateManyAndReturnArgs} args - Arguments to update many DataMovies.
     * @example
     * // Update many DataMovies
     * const dataMovie = await prisma.dataMovie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataMovies and only return the `id`
     * const dataMovieWithIdOnly = await prisma.dataMovie.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataMovieUpdateManyAndReturnArgs>(args: SelectSubset<T, DataMovieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one DataMovie.
     * @param {DataMovieUpsertArgs} args - Arguments to update or create a DataMovie.
     * @example
     * // Update or create a DataMovie
     * const dataMovie = await prisma.dataMovie.upsert({
     *   create: {
     *     // ... data to create a DataMovie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataMovie we want to update
     *   }
     * })
     */
    upsert<T extends DataMovieUpsertArgs>(args: SelectSubset<T, DataMovieUpsertArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of DataMovies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieCountArgs} args - Arguments to filter DataMovies to count.
     * @example
     * // Count the number of DataMovies
     * const count = await prisma.dataMovie.count({
     *   where: {
     *     // ... the filter for the DataMovies we want to count
     *   }
     * })
    **/
    count<T extends DataMovieCountArgs>(
      args?: Subset<T, DataMovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataMovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataMovie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataMovieAggregateArgs>(args: Subset<T, DataMovieAggregateArgs>): Prisma.PrismaPromise<GetDataMovieAggregateType<T>>

    /**
     * Group by DataMovie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataMovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataMovieGroupByArgs['orderBy'] }
        : { orderBy?: DataMovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataMovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataMovie model
   */
  readonly fields: DataMovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataMovie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataMovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gameDays<T extends DataMovie$gameDaysArgs<ExtArgs> = {}>(args?: Subset<T, DataMovie$gameDaysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DataMovie model
   */ 
  interface DataMovieFieldRefs {
    readonly id: FieldRef<"DataMovie", 'Int'>
    readonly tmdbId: FieldRef<"DataMovie", 'Int'>
    readonly title: FieldRef<"DataMovie", 'String'>
    readonly originalTitle: FieldRef<"DataMovie", 'String'>
    readonly year: FieldRef<"DataMovie", 'Int'>
    readonly releaseDate: FieldRef<"DataMovie", 'DateTime'>
    readonly runtime: FieldRef<"DataMovie", 'Int'>
    readonly director: FieldRef<"DataMovie", 'String'>
    readonly actors: FieldRef<"DataMovie", 'String'>
    readonly genres: FieldRef<"DataMovie", 'String'>
    readonly synopsis: FieldRef<"DataMovie", 'String'>
    readonly production: FieldRef<"DataMovie", 'String'>
    readonly country: FieldRef<"DataMovie", 'String'>
    readonly language: FieldRef<"DataMovie", 'String'>
    readonly voteAverage: FieldRef<"DataMovie", 'Float'>
    readonly voteCount: FieldRef<"DataMovie", 'Int'>
    readonly popularity: FieldRef<"DataMovie", 'Float'>
    readonly budget: FieldRef<"DataMovie", 'Int'>
    readonly keywords: FieldRef<"DataMovie", 'String'>
    readonly posterPath: FieldRef<"DataMovie", 'String'>
    readonly backdropPath: FieldRef<"DataMovie", 'String'>
    readonly image1: FieldRef<"DataMovie", 'String'>
    readonly image2: FieldRef<"DataMovie", 'String'>
    readonly image3: FieldRef<"DataMovie", 'String'>
    readonly image4: FieldRef<"DataMovie", 'String'>
    readonly image5: FieldRef<"DataMovie", 'String'>
    readonly image6: FieldRef<"DataMovie", 'String'>
    readonly image7: FieldRef<"DataMovie", 'String'>
    readonly image8: FieldRef<"DataMovie", 'String'>
    readonly image9: FieldRef<"DataMovie", 'String'>
    readonly image10: FieldRef<"DataMovie", 'String'>
    readonly createdAt: FieldRef<"DataMovie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DataMovie findUnique
   */
  export type DataMovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter, which DataMovie to fetch.
     */
    where: DataMovieWhereUniqueInput
  }

  /**
   * DataMovie findUniqueOrThrow
   */
  export type DataMovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter, which DataMovie to fetch.
     */
    where: DataMovieWhereUniqueInput
  }

  /**
   * DataMovie findFirst
   */
  export type DataMovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter, which DataMovie to fetch.
     */
    where?: DataMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMovies to fetch.
     */
    orderBy?: DataMovieOrderByWithRelationInput | DataMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataMovies.
     */
    cursor?: DataMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataMovies.
     */
    distinct?: DataMovieScalarFieldEnum | DataMovieScalarFieldEnum[]
  }

  /**
   * DataMovie findFirstOrThrow
   */
  export type DataMovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter, which DataMovie to fetch.
     */
    where?: DataMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMovies to fetch.
     */
    orderBy?: DataMovieOrderByWithRelationInput | DataMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataMovies.
     */
    cursor?: DataMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataMovies.
     */
    distinct?: DataMovieScalarFieldEnum | DataMovieScalarFieldEnum[]
  }

  /**
   * DataMovie findMany
   */
  export type DataMovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter, which DataMovies to fetch.
     */
    where?: DataMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMovies to fetch.
     */
    orderBy?: DataMovieOrderByWithRelationInput | DataMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataMovies.
     */
    cursor?: DataMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMovies.
     */
    skip?: number
    distinct?: DataMovieScalarFieldEnum | DataMovieScalarFieldEnum[]
  }

  /**
   * DataMovie create
   */
  export type DataMovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * The data needed to create a DataMovie.
     */
    data: XOR<DataMovieCreateInput, DataMovieUncheckedCreateInput>
  }

  /**
   * DataMovie createMany
   */
  export type DataMovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataMovies.
     */
    data: DataMovieCreateManyInput | DataMovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataMovie createManyAndReturn
   */
  export type DataMovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * The data used to create many DataMovies.
     */
    data: DataMovieCreateManyInput | DataMovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataMovie update
   */
  export type DataMovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * The data needed to update a DataMovie.
     */
    data: XOR<DataMovieUpdateInput, DataMovieUncheckedUpdateInput>
    /**
     * Choose, which DataMovie to update.
     */
    where: DataMovieWhereUniqueInput
  }

  /**
   * DataMovie updateMany
   */
  export type DataMovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataMovies.
     */
    data: XOR<DataMovieUpdateManyMutationInput, DataMovieUncheckedUpdateManyInput>
    /**
     * Filter which DataMovies to update
     */
    where?: DataMovieWhereInput
    /**
     * Limit how many DataMovies to update.
     */
    limit?: number
  }

  /**
   * DataMovie updateManyAndReturn
   */
  export type DataMovieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * The data used to update DataMovies.
     */
    data: XOR<DataMovieUpdateManyMutationInput, DataMovieUncheckedUpdateManyInput>
    /**
     * Filter which DataMovies to update
     */
    where?: DataMovieWhereInput
    /**
     * Limit how many DataMovies to update.
     */
    limit?: number
  }

  /**
   * DataMovie upsert
   */
  export type DataMovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * The filter to search for the DataMovie to update in case it exists.
     */
    where: DataMovieWhereUniqueInput
    /**
     * In case the DataMovie found by the `where` argument doesn't exist, create a new DataMovie with this data.
     */
    create: XOR<DataMovieCreateInput, DataMovieUncheckedCreateInput>
    /**
     * In case the DataMovie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataMovieUpdateInput, DataMovieUncheckedUpdateInput>
  }

  /**
   * DataMovie delete
   */
  export type DataMovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
    /**
     * Filter which DataMovie to delete.
     */
    where: DataMovieWhereUniqueInput
  }

  /**
   * DataMovie deleteMany
   */
  export type DataMovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataMovies to delete
     */
    where?: DataMovieWhereInput
    /**
     * Limit how many DataMovies to delete.
     */
    limit?: number
  }

  /**
   * DataMovie.gameDays
   */
  export type DataMovie$gameDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    where?: GameCinema1DaysWhereInput
    orderBy?: GameCinema1DaysOrderByWithRelationInput | GameCinema1DaysOrderByWithRelationInput[]
    cursor?: GameCinema1DaysWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameCinema1DaysScalarFieldEnum | GameCinema1DaysScalarFieldEnum[]
  }

  /**
   * DataMovie without action
   */
  export type DataMovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMovie
     */
    select?: DataMovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMovie
     */
    omit?: DataMovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMovieInclude<ExtArgs> | null
  }


  /**
   * Model GameCinema1Days
   */

  export type AggregateGameCinema1Days = {
    _count: GameCinema1DaysCountAggregateOutputType | null
    _avg: GameCinema1DaysAvgAggregateOutputType | null
    _sum: GameCinema1DaysSumAggregateOutputType | null
    _min: GameCinema1DaysMinAggregateOutputType | null
    _max: GameCinema1DaysMaxAggregateOutputType | null
  }

  export type GameCinema1DaysAvgAggregateOutputType = {
    id: number | null
    movieId: number | null
  }

  export type GameCinema1DaysSumAggregateOutputType = {
    id: number | null
    movieId: number | null
  }

  export type GameCinema1DaysMinAggregateOutputType = {
    id: number | null
    date: Date | null
    movieId: number | null
    createdAt: Date | null
  }

  export type GameCinema1DaysMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    movieId: number | null
    createdAt: Date | null
  }

  export type GameCinema1DaysCountAggregateOutputType = {
    id: number
    date: number
    movieId: number
    createdAt: number
    _all: number
  }


  export type GameCinema1DaysAvgAggregateInputType = {
    id?: true
    movieId?: true
  }

  export type GameCinema1DaysSumAggregateInputType = {
    id?: true
    movieId?: true
  }

  export type GameCinema1DaysMinAggregateInputType = {
    id?: true
    date?: true
    movieId?: true
    createdAt?: true
  }

  export type GameCinema1DaysMaxAggregateInputType = {
    id?: true
    date?: true
    movieId?: true
    createdAt?: true
  }

  export type GameCinema1DaysCountAggregateInputType = {
    id?: true
    date?: true
    movieId?: true
    createdAt?: true
    _all?: true
  }

  export type GameCinema1DaysAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCinema1Days to aggregate.
     */
    where?: GameCinema1DaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Days to fetch.
     */
    orderBy?: GameCinema1DaysOrderByWithRelationInput | GameCinema1DaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameCinema1DaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Days from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Days.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameCinema1Days
    **/
    _count?: true | GameCinema1DaysCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameCinema1DaysAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameCinema1DaysSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameCinema1DaysMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameCinema1DaysMaxAggregateInputType
  }

  export type GetGameCinema1DaysAggregateType<T extends GameCinema1DaysAggregateArgs> = {
        [P in keyof T & keyof AggregateGameCinema1Days]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameCinema1Days[P]>
      : GetScalarType<T[P], AggregateGameCinema1Days[P]>
  }




  export type GameCinema1DaysGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameCinema1DaysWhereInput
    orderBy?: GameCinema1DaysOrderByWithAggregationInput | GameCinema1DaysOrderByWithAggregationInput[]
    by: GameCinema1DaysScalarFieldEnum[] | GameCinema1DaysScalarFieldEnum
    having?: GameCinema1DaysScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCinema1DaysCountAggregateInputType | true
    _avg?: GameCinema1DaysAvgAggregateInputType
    _sum?: GameCinema1DaysSumAggregateInputType
    _min?: GameCinema1DaysMinAggregateInputType
    _max?: GameCinema1DaysMaxAggregateInputType
  }

  export type GameCinema1DaysGroupByOutputType = {
    id: number
    date: Date
    movieId: number
    createdAt: Date
    _count: GameCinema1DaysCountAggregateOutputType | null
    _avg: GameCinema1DaysAvgAggregateOutputType | null
    _sum: GameCinema1DaysSumAggregateOutputType | null
    _min: GameCinema1DaysMinAggregateOutputType | null
    _max: GameCinema1DaysMaxAggregateOutputType | null
  }

  type GetGameCinema1DaysGroupByPayload<T extends GameCinema1DaysGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameCinema1DaysGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameCinema1DaysGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameCinema1DaysGroupByOutputType[P]>
            : GetScalarType<T[P], GameCinema1DaysGroupByOutputType[P]>
        }
      >
    >


  export type GameCinema1DaysSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    movieId?: boolean
    createdAt?: boolean
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
    tries?: boolean | GameCinema1Days$triesArgs<ExtArgs>
    _count?: boolean | GameCinema1DaysCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Days"]>

  export type GameCinema1DaysSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    movieId?: boolean
    createdAt?: boolean
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Days"]>

  export type GameCinema1DaysSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    movieId?: boolean
    createdAt?: boolean
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Days"]>

  export type GameCinema1DaysSelectScalar = {
    id?: boolean
    date?: boolean
    movieId?: boolean
    createdAt?: boolean
  }

  export type GameCinema1DaysOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "movieId" | "createdAt", ExtArgs["result"]["gameCinema1Days"]>
  export type GameCinema1DaysInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
    tries?: boolean | GameCinema1Days$triesArgs<ExtArgs>
    _count?: boolean | GameCinema1DaysCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameCinema1DaysIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
  }
  export type GameCinema1DaysIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | DataMovieDefaultArgs<ExtArgs>
  }

  export type $GameCinema1DaysPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameCinema1Days"
    objects: {
      movie: Prisma.$DataMoviePayload<ExtArgs>
      tries: Prisma.$GameCinema1TriesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      movieId: number
      createdAt: Date
    }, ExtArgs["result"]["gameCinema1Days"]>
    composites: {}
  }

  type GameCinema1DaysGetPayload<S extends boolean | null | undefined | GameCinema1DaysDefaultArgs> = $Result.GetResult<Prisma.$GameCinema1DaysPayload, S>

  type GameCinema1DaysCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameCinema1DaysFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCinema1DaysCountAggregateInputType | true
    }

  export interface GameCinema1DaysDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameCinema1Days'], meta: { name: 'GameCinema1Days' } }
    /**
     * Find zero or one GameCinema1Days that matches the filter.
     * @param {GameCinema1DaysFindUniqueArgs} args - Arguments to find a GameCinema1Days
     * @example
     * // Get one GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameCinema1DaysFindUniqueArgs>(args: SelectSubset<T, GameCinema1DaysFindUniqueArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GameCinema1Days that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameCinema1DaysFindUniqueOrThrowArgs} args - Arguments to find a GameCinema1Days
     * @example
     * // Get one GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameCinema1DaysFindUniqueOrThrowArgs>(args: SelectSubset<T, GameCinema1DaysFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GameCinema1Days that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysFindFirstArgs} args - Arguments to find a GameCinema1Days
     * @example
     * // Get one GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameCinema1DaysFindFirstArgs>(args?: SelectSubset<T, GameCinema1DaysFindFirstArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GameCinema1Days that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysFindFirstOrThrowArgs} args - Arguments to find a GameCinema1Days
     * @example
     * // Get one GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameCinema1DaysFindFirstOrThrowArgs>(args?: SelectSubset<T, GameCinema1DaysFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GameCinema1Days that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findMany()
     * 
     * // Get first 10 GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameCinema1DaysWithIdOnly = await prisma.gameCinema1Days.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameCinema1DaysFindManyArgs>(args?: SelectSubset<T, GameCinema1DaysFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GameCinema1Days.
     * @param {GameCinema1DaysCreateArgs} args - Arguments to create a GameCinema1Days.
     * @example
     * // Create one GameCinema1Days
     * const GameCinema1Days = await prisma.gameCinema1Days.create({
     *   data: {
     *     // ... data to create a GameCinema1Days
     *   }
     * })
     * 
     */
    create<T extends GameCinema1DaysCreateArgs>(args: SelectSubset<T, GameCinema1DaysCreateArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GameCinema1Days.
     * @param {GameCinema1DaysCreateManyArgs} args - Arguments to create many GameCinema1Days.
     * @example
     * // Create many GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCinema1DaysCreateManyArgs>(args?: SelectSubset<T, GameCinema1DaysCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameCinema1Days and returns the data saved in the database.
     * @param {GameCinema1DaysCreateManyAndReturnArgs} args - Arguments to create many GameCinema1Days.
     * @example
     * // Create many GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameCinema1Days and only return the `id`
     * const gameCinema1DaysWithIdOnly = await prisma.gameCinema1Days.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCinema1DaysCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCinema1DaysCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GameCinema1Days.
     * @param {GameCinema1DaysDeleteArgs} args - Arguments to delete one GameCinema1Days.
     * @example
     * // Delete one GameCinema1Days
     * const GameCinema1Days = await prisma.gameCinema1Days.delete({
     *   where: {
     *     // ... filter to delete one GameCinema1Days
     *   }
     * })
     * 
     */
    delete<T extends GameCinema1DaysDeleteArgs>(args: SelectSubset<T, GameCinema1DaysDeleteArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GameCinema1Days.
     * @param {GameCinema1DaysUpdateArgs} args - Arguments to update one GameCinema1Days.
     * @example
     * // Update one GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameCinema1DaysUpdateArgs>(args: SelectSubset<T, GameCinema1DaysUpdateArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GameCinema1Days.
     * @param {GameCinema1DaysDeleteManyArgs} args - Arguments to filter GameCinema1Days to delete.
     * @example
     * // Delete a few GameCinema1Days
     * const { count } = await prisma.gameCinema1Days.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameCinema1DaysDeleteManyArgs>(args?: SelectSubset<T, GameCinema1DaysDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCinema1Days.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameCinema1DaysUpdateManyArgs>(args: SelectSubset<T, GameCinema1DaysUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCinema1Days and returns the data updated in the database.
     * @param {GameCinema1DaysUpdateManyAndReturnArgs} args - Arguments to update many GameCinema1Days.
     * @example
     * // Update many GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameCinema1Days and only return the `id`
     * const gameCinema1DaysWithIdOnly = await prisma.gameCinema1Days.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameCinema1DaysUpdateManyAndReturnArgs>(args: SelectSubset<T, GameCinema1DaysUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GameCinema1Days.
     * @param {GameCinema1DaysUpsertArgs} args - Arguments to update or create a GameCinema1Days.
     * @example
     * // Update or create a GameCinema1Days
     * const gameCinema1Days = await prisma.gameCinema1Days.upsert({
     *   create: {
     *     // ... data to create a GameCinema1Days
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameCinema1Days we want to update
     *   }
     * })
     */
    upsert<T extends GameCinema1DaysUpsertArgs>(args: SelectSubset<T, GameCinema1DaysUpsertArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GameCinema1Days.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysCountArgs} args - Arguments to filter GameCinema1Days to count.
     * @example
     * // Count the number of GameCinema1Days
     * const count = await prisma.gameCinema1Days.count({
     *   where: {
     *     // ... the filter for the GameCinema1Days we want to count
     *   }
     * })
    **/
    count<T extends GameCinema1DaysCountArgs>(
      args?: Subset<T, GameCinema1DaysCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCinema1DaysCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameCinema1Days.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameCinema1DaysAggregateArgs>(args: Subset<T, GameCinema1DaysAggregateArgs>): Prisma.PrismaPromise<GetGameCinema1DaysAggregateType<T>>

    /**
     * Group by GameCinema1Days.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1DaysGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameCinema1DaysGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameCinema1DaysGroupByArgs['orderBy'] }
        : { orderBy?: GameCinema1DaysGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameCinema1DaysGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameCinema1DaysGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameCinema1Days model
   */
  readonly fields: GameCinema1DaysFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameCinema1Days.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameCinema1DaysClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movie<T extends DataMovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DataMovieDefaultArgs<ExtArgs>>): Prisma__DataMovieClient<$Result.GetResult<Prisma.$DataMoviePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    tries<T extends GameCinema1Days$triesArgs<ExtArgs> = {}>(args?: Subset<T, GameCinema1Days$triesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameCinema1Days model
   */ 
  interface GameCinema1DaysFieldRefs {
    readonly id: FieldRef<"GameCinema1Days", 'Int'>
    readonly date: FieldRef<"GameCinema1Days", 'DateTime'>
    readonly movieId: FieldRef<"GameCinema1Days", 'Int'>
    readonly createdAt: FieldRef<"GameCinema1Days", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameCinema1Days findUnique
   */
  export type GameCinema1DaysFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Days to fetch.
     */
    where: GameCinema1DaysWhereUniqueInput
  }

  /**
   * GameCinema1Days findUniqueOrThrow
   */
  export type GameCinema1DaysFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Days to fetch.
     */
    where: GameCinema1DaysWhereUniqueInput
  }

  /**
   * GameCinema1Days findFirst
   */
  export type GameCinema1DaysFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Days to fetch.
     */
    where?: GameCinema1DaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Days to fetch.
     */
    orderBy?: GameCinema1DaysOrderByWithRelationInput | GameCinema1DaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCinema1Days.
     */
    cursor?: GameCinema1DaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Days from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Days.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCinema1Days.
     */
    distinct?: GameCinema1DaysScalarFieldEnum | GameCinema1DaysScalarFieldEnum[]
  }

  /**
   * GameCinema1Days findFirstOrThrow
   */
  export type GameCinema1DaysFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Days to fetch.
     */
    where?: GameCinema1DaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Days to fetch.
     */
    orderBy?: GameCinema1DaysOrderByWithRelationInput | GameCinema1DaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCinema1Days.
     */
    cursor?: GameCinema1DaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Days from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Days.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCinema1Days.
     */
    distinct?: GameCinema1DaysScalarFieldEnum | GameCinema1DaysScalarFieldEnum[]
  }

  /**
   * GameCinema1Days findMany
   */
  export type GameCinema1DaysFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Days to fetch.
     */
    where?: GameCinema1DaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Days to fetch.
     */
    orderBy?: GameCinema1DaysOrderByWithRelationInput | GameCinema1DaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameCinema1Days.
     */
    cursor?: GameCinema1DaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Days from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Days.
     */
    skip?: number
    distinct?: GameCinema1DaysScalarFieldEnum | GameCinema1DaysScalarFieldEnum[]
  }

  /**
   * GameCinema1Days create
   */
  export type GameCinema1DaysCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * The data needed to create a GameCinema1Days.
     */
    data: XOR<GameCinema1DaysCreateInput, GameCinema1DaysUncheckedCreateInput>
  }

  /**
   * GameCinema1Days createMany
   */
  export type GameCinema1DaysCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameCinema1Days.
     */
    data: GameCinema1DaysCreateManyInput | GameCinema1DaysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameCinema1Days createManyAndReturn
   */
  export type GameCinema1DaysCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * The data used to create many GameCinema1Days.
     */
    data: GameCinema1DaysCreateManyInput | GameCinema1DaysCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameCinema1Days update
   */
  export type GameCinema1DaysUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * The data needed to update a GameCinema1Days.
     */
    data: XOR<GameCinema1DaysUpdateInput, GameCinema1DaysUncheckedUpdateInput>
    /**
     * Choose, which GameCinema1Days to update.
     */
    where: GameCinema1DaysWhereUniqueInput
  }

  /**
   * GameCinema1Days updateMany
   */
  export type GameCinema1DaysUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameCinema1Days.
     */
    data: XOR<GameCinema1DaysUpdateManyMutationInput, GameCinema1DaysUncheckedUpdateManyInput>
    /**
     * Filter which GameCinema1Days to update
     */
    where?: GameCinema1DaysWhereInput
    /**
     * Limit how many GameCinema1Days to update.
     */
    limit?: number
  }

  /**
   * GameCinema1Days updateManyAndReturn
   */
  export type GameCinema1DaysUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * The data used to update GameCinema1Days.
     */
    data: XOR<GameCinema1DaysUpdateManyMutationInput, GameCinema1DaysUncheckedUpdateManyInput>
    /**
     * Filter which GameCinema1Days to update
     */
    where?: GameCinema1DaysWhereInput
    /**
     * Limit how many GameCinema1Days to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameCinema1Days upsert
   */
  export type GameCinema1DaysUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * The filter to search for the GameCinema1Days to update in case it exists.
     */
    where: GameCinema1DaysWhereUniqueInput
    /**
     * In case the GameCinema1Days found by the `where` argument doesn't exist, create a new GameCinema1Days with this data.
     */
    create: XOR<GameCinema1DaysCreateInput, GameCinema1DaysUncheckedCreateInput>
    /**
     * In case the GameCinema1Days was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameCinema1DaysUpdateInput, GameCinema1DaysUncheckedUpdateInput>
  }

  /**
   * GameCinema1Days delete
   */
  export type GameCinema1DaysDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
    /**
     * Filter which GameCinema1Days to delete.
     */
    where: GameCinema1DaysWhereUniqueInput
  }

  /**
   * GameCinema1Days deleteMany
   */
  export type GameCinema1DaysDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCinema1Days to delete
     */
    where?: GameCinema1DaysWhereInput
    /**
     * Limit how many GameCinema1Days to delete.
     */
    limit?: number
  }

  /**
   * GameCinema1Days.tries
   */
  export type GameCinema1Days$triesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    where?: GameCinema1TriesWhereInput
    orderBy?: GameCinema1TriesOrderByWithRelationInput | GameCinema1TriesOrderByWithRelationInput[]
    cursor?: GameCinema1TriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameCinema1TriesScalarFieldEnum | GameCinema1TriesScalarFieldEnum[]
  }

  /**
   * GameCinema1Days without action
   */
  export type GameCinema1DaysDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Days
     */
    select?: GameCinema1DaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Days
     */
    omit?: GameCinema1DaysOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1DaysInclude<ExtArgs> | null
  }


  /**
   * Model GameCinema1Tries
   */

  export type AggregateGameCinema1Tries = {
    _count: GameCinema1TriesCountAggregateOutputType | null
    _avg: GameCinema1TriesAvgAggregateOutputType | null
    _sum: GameCinema1TriesSumAggregateOutputType | null
    _min: GameCinema1TriesMinAggregateOutputType | null
    _max: GameCinema1TriesMaxAggregateOutputType | null
  }

  export type GameCinema1TriesAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    dayId: number | null
  }

  export type GameCinema1TriesSumAggregateOutputType = {
    id: number | null
    userId: number | null
    dayId: number | null
  }

  export type GameCinema1TriesMinAggregateOutputType = {
    id: number | null
    userId: number | null
    dayId: number | null
    guess: string | null
    correct: boolean | null
    createdAt: Date | null
  }

  export type GameCinema1TriesMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    dayId: number | null
    guess: string | null
    correct: boolean | null
    createdAt: Date | null
  }

  export type GameCinema1TriesCountAggregateOutputType = {
    id: number
    userId: number
    dayId: number
    guess: number
    correct: number
    createdAt: number
    _all: number
  }


  export type GameCinema1TriesAvgAggregateInputType = {
    id?: true
    userId?: true
    dayId?: true
  }

  export type GameCinema1TriesSumAggregateInputType = {
    id?: true
    userId?: true
    dayId?: true
  }

  export type GameCinema1TriesMinAggregateInputType = {
    id?: true
    userId?: true
    dayId?: true
    guess?: true
    correct?: true
    createdAt?: true
  }

  export type GameCinema1TriesMaxAggregateInputType = {
    id?: true
    userId?: true
    dayId?: true
    guess?: true
    correct?: true
    createdAt?: true
  }

  export type GameCinema1TriesCountAggregateInputType = {
    id?: true
    userId?: true
    dayId?: true
    guess?: true
    correct?: true
    createdAt?: true
    _all?: true
  }

  export type GameCinema1TriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCinema1Tries to aggregate.
     */
    where?: GameCinema1TriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Tries to fetch.
     */
    orderBy?: GameCinema1TriesOrderByWithRelationInput | GameCinema1TriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameCinema1TriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Tries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Tries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameCinema1Tries
    **/
    _count?: true | GameCinema1TriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameCinema1TriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameCinema1TriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameCinema1TriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameCinema1TriesMaxAggregateInputType
  }

  export type GetGameCinema1TriesAggregateType<T extends GameCinema1TriesAggregateArgs> = {
        [P in keyof T & keyof AggregateGameCinema1Tries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameCinema1Tries[P]>
      : GetScalarType<T[P], AggregateGameCinema1Tries[P]>
  }




  export type GameCinema1TriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameCinema1TriesWhereInput
    orderBy?: GameCinema1TriesOrderByWithAggregationInput | GameCinema1TriesOrderByWithAggregationInput[]
    by: GameCinema1TriesScalarFieldEnum[] | GameCinema1TriesScalarFieldEnum
    having?: GameCinema1TriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCinema1TriesCountAggregateInputType | true
    _avg?: GameCinema1TriesAvgAggregateInputType
    _sum?: GameCinema1TriesSumAggregateInputType
    _min?: GameCinema1TriesMinAggregateInputType
    _max?: GameCinema1TriesMaxAggregateInputType
  }

  export type GameCinema1TriesGroupByOutputType = {
    id: number
    userId: number
    dayId: number
    guess: string
    correct: boolean
    createdAt: Date
    _count: GameCinema1TriesCountAggregateOutputType | null
    _avg: GameCinema1TriesAvgAggregateOutputType | null
    _sum: GameCinema1TriesSumAggregateOutputType | null
    _min: GameCinema1TriesMinAggregateOutputType | null
    _max: GameCinema1TriesMaxAggregateOutputType | null
  }

  type GetGameCinema1TriesGroupByPayload<T extends GameCinema1TriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameCinema1TriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameCinema1TriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameCinema1TriesGroupByOutputType[P]>
            : GetScalarType<T[P], GameCinema1TriesGroupByOutputType[P]>
        }
      >
    >


  export type GameCinema1TriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dayId?: boolean
    guess?: boolean
    correct?: boolean
    createdAt?: boolean
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Tries"]>

  export type GameCinema1TriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dayId?: boolean
    guess?: boolean
    correct?: boolean
    createdAt?: boolean
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Tries"]>

  export type GameCinema1TriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dayId?: boolean
    guess?: boolean
    correct?: boolean
    createdAt?: boolean
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameCinema1Tries"]>

  export type GameCinema1TriesSelectScalar = {
    id?: boolean
    userId?: boolean
    dayId?: boolean
    guess?: boolean
    correct?: boolean
    createdAt?: boolean
  }

  export type GameCinema1TriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dayId" | "guess" | "correct" | "createdAt", ExtArgs["result"]["gameCinema1Tries"]>
  export type GameCinema1TriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }
  export type GameCinema1TriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }
  export type GameCinema1TriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    day?: boolean | GameCinema1DaysDefaultArgs<ExtArgs>
  }

  export type $GameCinema1TriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameCinema1Tries"
    objects: {
      day: Prisma.$GameCinema1DaysPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      dayId: number
      guess: string
      correct: boolean
      createdAt: Date
    }, ExtArgs["result"]["gameCinema1Tries"]>
    composites: {}
  }

  type GameCinema1TriesGetPayload<S extends boolean | null | undefined | GameCinema1TriesDefaultArgs> = $Result.GetResult<Prisma.$GameCinema1TriesPayload, S>

  type GameCinema1TriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameCinema1TriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCinema1TriesCountAggregateInputType | true
    }

  export interface GameCinema1TriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameCinema1Tries'], meta: { name: 'GameCinema1Tries' } }
    /**
     * Find zero or one GameCinema1Tries that matches the filter.
     * @param {GameCinema1TriesFindUniqueArgs} args - Arguments to find a GameCinema1Tries
     * @example
     * // Get one GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameCinema1TriesFindUniqueArgs>(args: SelectSubset<T, GameCinema1TriesFindUniqueArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GameCinema1Tries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameCinema1TriesFindUniqueOrThrowArgs} args - Arguments to find a GameCinema1Tries
     * @example
     * // Get one GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameCinema1TriesFindUniqueOrThrowArgs>(args: SelectSubset<T, GameCinema1TriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GameCinema1Tries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesFindFirstArgs} args - Arguments to find a GameCinema1Tries
     * @example
     * // Get one GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameCinema1TriesFindFirstArgs>(args?: SelectSubset<T, GameCinema1TriesFindFirstArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GameCinema1Tries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesFindFirstOrThrowArgs} args - Arguments to find a GameCinema1Tries
     * @example
     * // Get one GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameCinema1TriesFindFirstOrThrowArgs>(args?: SelectSubset<T, GameCinema1TriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GameCinema1Tries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findMany()
     * 
     * // Get first 10 GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameCinema1TriesWithIdOnly = await prisma.gameCinema1Tries.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameCinema1TriesFindManyArgs>(args?: SelectSubset<T, GameCinema1TriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GameCinema1Tries.
     * @param {GameCinema1TriesCreateArgs} args - Arguments to create a GameCinema1Tries.
     * @example
     * // Create one GameCinema1Tries
     * const GameCinema1Tries = await prisma.gameCinema1Tries.create({
     *   data: {
     *     // ... data to create a GameCinema1Tries
     *   }
     * })
     * 
     */
    create<T extends GameCinema1TriesCreateArgs>(args: SelectSubset<T, GameCinema1TriesCreateArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GameCinema1Tries.
     * @param {GameCinema1TriesCreateManyArgs} args - Arguments to create many GameCinema1Tries.
     * @example
     * // Create many GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCinema1TriesCreateManyArgs>(args?: SelectSubset<T, GameCinema1TriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameCinema1Tries and returns the data saved in the database.
     * @param {GameCinema1TriesCreateManyAndReturnArgs} args - Arguments to create many GameCinema1Tries.
     * @example
     * // Create many GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameCinema1Tries and only return the `id`
     * const gameCinema1TriesWithIdOnly = await prisma.gameCinema1Tries.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCinema1TriesCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCinema1TriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GameCinema1Tries.
     * @param {GameCinema1TriesDeleteArgs} args - Arguments to delete one GameCinema1Tries.
     * @example
     * // Delete one GameCinema1Tries
     * const GameCinema1Tries = await prisma.gameCinema1Tries.delete({
     *   where: {
     *     // ... filter to delete one GameCinema1Tries
     *   }
     * })
     * 
     */
    delete<T extends GameCinema1TriesDeleteArgs>(args: SelectSubset<T, GameCinema1TriesDeleteArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GameCinema1Tries.
     * @param {GameCinema1TriesUpdateArgs} args - Arguments to update one GameCinema1Tries.
     * @example
     * // Update one GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameCinema1TriesUpdateArgs>(args: SelectSubset<T, GameCinema1TriesUpdateArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GameCinema1Tries.
     * @param {GameCinema1TriesDeleteManyArgs} args - Arguments to filter GameCinema1Tries to delete.
     * @example
     * // Delete a few GameCinema1Tries
     * const { count } = await prisma.gameCinema1Tries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameCinema1TriesDeleteManyArgs>(args?: SelectSubset<T, GameCinema1TriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCinema1Tries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameCinema1TriesUpdateManyArgs>(args: SelectSubset<T, GameCinema1TriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameCinema1Tries and returns the data updated in the database.
     * @param {GameCinema1TriesUpdateManyAndReturnArgs} args - Arguments to update many GameCinema1Tries.
     * @example
     * // Update many GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameCinema1Tries and only return the `id`
     * const gameCinema1TriesWithIdOnly = await prisma.gameCinema1Tries.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameCinema1TriesUpdateManyAndReturnArgs>(args: SelectSubset<T, GameCinema1TriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GameCinema1Tries.
     * @param {GameCinema1TriesUpsertArgs} args - Arguments to update or create a GameCinema1Tries.
     * @example
     * // Update or create a GameCinema1Tries
     * const gameCinema1Tries = await prisma.gameCinema1Tries.upsert({
     *   create: {
     *     // ... data to create a GameCinema1Tries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameCinema1Tries we want to update
     *   }
     * })
     */
    upsert<T extends GameCinema1TriesUpsertArgs>(args: SelectSubset<T, GameCinema1TriesUpsertArgs<ExtArgs>>): Prisma__GameCinema1TriesClient<$Result.GetResult<Prisma.$GameCinema1TriesPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GameCinema1Tries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesCountArgs} args - Arguments to filter GameCinema1Tries to count.
     * @example
     * // Count the number of GameCinema1Tries
     * const count = await prisma.gameCinema1Tries.count({
     *   where: {
     *     // ... the filter for the GameCinema1Tries we want to count
     *   }
     * })
    **/
    count<T extends GameCinema1TriesCountArgs>(
      args?: Subset<T, GameCinema1TriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCinema1TriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameCinema1Tries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameCinema1TriesAggregateArgs>(args: Subset<T, GameCinema1TriesAggregateArgs>): Prisma.PrismaPromise<GetGameCinema1TriesAggregateType<T>>

    /**
     * Group by GameCinema1Tries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCinema1TriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameCinema1TriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameCinema1TriesGroupByArgs['orderBy'] }
        : { orderBy?: GameCinema1TriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameCinema1TriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameCinema1TriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameCinema1Tries model
   */
  readonly fields: GameCinema1TriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameCinema1Tries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameCinema1TriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    day<T extends GameCinema1DaysDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameCinema1DaysDefaultArgs<ExtArgs>>): Prisma__GameCinema1DaysClient<$Result.GetResult<Prisma.$GameCinema1DaysPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameCinema1Tries model
   */ 
  interface GameCinema1TriesFieldRefs {
    readonly id: FieldRef<"GameCinema1Tries", 'Int'>
    readonly userId: FieldRef<"GameCinema1Tries", 'Int'>
    readonly dayId: FieldRef<"GameCinema1Tries", 'Int'>
    readonly guess: FieldRef<"GameCinema1Tries", 'String'>
    readonly correct: FieldRef<"GameCinema1Tries", 'Boolean'>
    readonly createdAt: FieldRef<"GameCinema1Tries", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameCinema1Tries findUnique
   */
  export type GameCinema1TriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Tries to fetch.
     */
    where: GameCinema1TriesWhereUniqueInput
  }

  /**
   * GameCinema1Tries findUniqueOrThrow
   */
  export type GameCinema1TriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Tries to fetch.
     */
    where: GameCinema1TriesWhereUniqueInput
  }

  /**
   * GameCinema1Tries findFirst
   */
  export type GameCinema1TriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Tries to fetch.
     */
    where?: GameCinema1TriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Tries to fetch.
     */
    orderBy?: GameCinema1TriesOrderByWithRelationInput | GameCinema1TriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCinema1Tries.
     */
    cursor?: GameCinema1TriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Tries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Tries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCinema1Tries.
     */
    distinct?: GameCinema1TriesScalarFieldEnum | GameCinema1TriesScalarFieldEnum[]
  }

  /**
   * GameCinema1Tries findFirstOrThrow
   */
  export type GameCinema1TriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Tries to fetch.
     */
    where?: GameCinema1TriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Tries to fetch.
     */
    orderBy?: GameCinema1TriesOrderByWithRelationInput | GameCinema1TriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameCinema1Tries.
     */
    cursor?: GameCinema1TriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Tries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Tries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameCinema1Tries.
     */
    distinct?: GameCinema1TriesScalarFieldEnum | GameCinema1TriesScalarFieldEnum[]
  }

  /**
   * GameCinema1Tries findMany
   */
  export type GameCinema1TriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter, which GameCinema1Tries to fetch.
     */
    where?: GameCinema1TriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameCinema1Tries to fetch.
     */
    orderBy?: GameCinema1TriesOrderByWithRelationInput | GameCinema1TriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameCinema1Tries.
     */
    cursor?: GameCinema1TriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameCinema1Tries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameCinema1Tries.
     */
    skip?: number
    distinct?: GameCinema1TriesScalarFieldEnum | GameCinema1TriesScalarFieldEnum[]
  }

  /**
   * GameCinema1Tries create
   */
  export type GameCinema1TriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * The data needed to create a GameCinema1Tries.
     */
    data: XOR<GameCinema1TriesCreateInput, GameCinema1TriesUncheckedCreateInput>
  }

  /**
   * GameCinema1Tries createMany
   */
  export type GameCinema1TriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameCinema1Tries.
     */
    data: GameCinema1TriesCreateManyInput | GameCinema1TriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameCinema1Tries createManyAndReturn
   */
  export type GameCinema1TriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * The data used to create many GameCinema1Tries.
     */
    data: GameCinema1TriesCreateManyInput | GameCinema1TriesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameCinema1Tries update
   */
  export type GameCinema1TriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * The data needed to update a GameCinema1Tries.
     */
    data: XOR<GameCinema1TriesUpdateInput, GameCinema1TriesUncheckedUpdateInput>
    /**
     * Choose, which GameCinema1Tries to update.
     */
    where: GameCinema1TriesWhereUniqueInput
  }

  /**
   * GameCinema1Tries updateMany
   */
  export type GameCinema1TriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameCinema1Tries.
     */
    data: XOR<GameCinema1TriesUpdateManyMutationInput, GameCinema1TriesUncheckedUpdateManyInput>
    /**
     * Filter which GameCinema1Tries to update
     */
    where?: GameCinema1TriesWhereInput
    /**
     * Limit how many GameCinema1Tries to update.
     */
    limit?: number
  }

  /**
   * GameCinema1Tries updateManyAndReturn
   */
  export type GameCinema1TriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * The data used to update GameCinema1Tries.
     */
    data: XOR<GameCinema1TriesUpdateManyMutationInput, GameCinema1TriesUncheckedUpdateManyInput>
    /**
     * Filter which GameCinema1Tries to update
     */
    where?: GameCinema1TriesWhereInput
    /**
     * Limit how many GameCinema1Tries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameCinema1Tries upsert
   */
  export type GameCinema1TriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * The filter to search for the GameCinema1Tries to update in case it exists.
     */
    where: GameCinema1TriesWhereUniqueInput
    /**
     * In case the GameCinema1Tries found by the `where` argument doesn't exist, create a new GameCinema1Tries with this data.
     */
    create: XOR<GameCinema1TriesCreateInput, GameCinema1TriesUncheckedCreateInput>
    /**
     * In case the GameCinema1Tries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameCinema1TriesUpdateInput, GameCinema1TriesUncheckedUpdateInput>
  }

  /**
   * GameCinema1Tries delete
   */
  export type GameCinema1TriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
    /**
     * Filter which GameCinema1Tries to delete.
     */
    where: GameCinema1TriesWhereUniqueInput
  }

  /**
   * GameCinema1Tries deleteMany
   */
  export type GameCinema1TriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameCinema1Tries to delete
     */
    where?: GameCinema1TriesWhereInput
    /**
     * Limit how many GameCinema1Tries to delete.
     */
    limit?: number
  }

  /**
   * GameCinema1Tries without action
   */
  export type GameCinema1TriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCinema1Tries
     */
    select?: GameCinema1TriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameCinema1Tries
     */
    omit?: GameCinema1TriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameCinema1TriesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    pseudo: 'pseudo',
    firstName: 'firstName',
    lastName: 'lastName',
    birthdate: 'birthdate',
    isVip: 'isVip',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AvatarScalarFieldEnum: {
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

  export type AvatarScalarFieldEnum = (typeof AvatarScalarFieldEnum)[keyof typeof AvatarScalarFieldEnum]


  export const ColorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    gradientValue: 'gradientValue',
    level: 'level',
    vip: 'vip'
  };

  export type ColorScalarFieldEnum = (typeof ColorScalarFieldEnum)[keyof typeof ColorScalarFieldEnum]


  export const AvatarAssetScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    url: 'url',
    level: 'level',
    vipOnly: 'vipOnly'
  };

  export type AvatarAssetScalarFieldEnum = (typeof AvatarAssetScalarFieldEnum)[keyof typeof AvatarAssetScalarFieldEnum]


  export const FriendScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    friendId: 'friendId',
    status: 'status',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt'
  };

  export type FriendScalarFieldEnum = (typeof FriendScalarFieldEnum)[keyof typeof FriendScalarFieldEnum]


  export const UserStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    xp: 'xp',
    level: 'level',
    streak: 'streak',
    lastPlayedAt: 'lastPlayedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum]


  export const UserEventScalarFieldEnum: {
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

  export type UserEventScalarFieldEnum = (typeof UserEventScalarFieldEnum)[keyof typeof UserEventScalarFieldEnum]


  export const GameResultScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    score: 'score',
    xpGained: 'xpGained',
    status: 'status',
    date: 'date',
    deletedAt: 'deletedAt'
  };

  export type GameResultScalarFieldEnum = (typeof GameResultScalarFieldEnum)[keyof typeof GameResultScalarFieldEnum]


  export const GameScalarFieldEnum: {
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

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GameCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    color: 'color'
  };

  export type GameCategoryScalarFieldEnum = (typeof GameCategoryScalarFieldEnum)[keyof typeof GameCategoryScalarFieldEnum]


  export const DataMovieScalarFieldEnum: {
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

  export type DataMovieScalarFieldEnum = (typeof DataMovieScalarFieldEnum)[keyof typeof DataMovieScalarFieldEnum]


  export const GameCinema1DaysScalarFieldEnum: {
    id: 'id',
    date: 'date',
    movieId: 'movieId',
    createdAt: 'createdAt'
  };

  export type GameCinema1DaysScalarFieldEnum = (typeof GameCinema1DaysScalarFieldEnum)[keyof typeof GameCinema1DaysScalarFieldEnum]


  export const GameCinema1TriesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dayId: 'dayId',
    guess: 'guess',
    correct: 'correct',
    createdAt: 'createdAt'
  };

  export type GameCinema1TriesScalarFieldEnum = (typeof GameCinema1TriesScalarFieldEnum)[keyof typeof GameCinema1TriesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    pseudo?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    birthdate?: DateTimeNullableFilter<"User"> | Date | string | null
    isVip?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avatar?: XOR<AvatarNullableScalarRelationFilter, AvatarWhereInput> | null
    friends?: FriendListRelationFilter
    friend?: FriendListRelationFilter
    userStats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    userEvents?: UserEventListRelationFilter
    gameResults?: GameResultListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    pseudo?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    isVip?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    avatar?: AvatarOrderByWithRelationInput
    friends?: FriendOrderByRelationAggregateInput
    friend?: FriendOrderByRelationAggregateInput
    userStats?: UserStatsOrderByWithRelationInput
    userEvents?: UserEventOrderByRelationAggregateInput
    gameResults?: GameResultOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    pseudo?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    birthdate?: DateTimeNullableFilter<"User"> | Date | string | null
    isVip?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    avatar?: XOR<AvatarNullableScalarRelationFilter, AvatarWhereInput> | null
    friends?: FriendListRelationFilter
    friend?: FriendListRelationFilter
    userStats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    userEvents?: UserEventListRelationFilter
    gameResults?: GameResultListRelationFilter
  }, "id" | "email" | "pseudo">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    pseudo?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    isVip?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    pseudo?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthdate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isVip?: BoolWithAggregatesFilter<"User"> | boolean
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type AvatarWhereInput = {
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    id?: IntFilter<"Avatar"> | number
    url?: StringFilter<"Avatar"> | string
    shapeId?: IntFilter<"Avatar"> | number
    eyesId?: IntFilter<"Avatar"> | number
    mouthId?: IntFilter<"Avatar"> | number
    patternId?: IntNullableFilter<"Avatar"> | number | null
    colorShapeId?: IntFilter<"Avatar"> | number
    colorPatternId?: IntNullableFilter<"Avatar"> | number | null
    userId?: IntFilter<"Avatar"> | number
    shape?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    eyes?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    mouth?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    pattern?: XOR<AvatarAssetNullableScalarRelationFilter, AvatarAssetWhereInput> | null
    colorShape?: XOR<ColorScalarRelationFilter, ColorWhereInput>
    colorPattern?: XOR<ColorNullableScalarRelationFilter, ColorWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AvatarOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrderInput | SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrderInput | SortOrder
    userId?: SortOrder
    shape?: AvatarAssetOrderByWithRelationInput
    eyes?: AvatarAssetOrderByWithRelationInput
    mouth?: AvatarAssetOrderByWithRelationInput
    pattern?: AvatarAssetOrderByWithRelationInput
    colorShape?: ColorOrderByWithRelationInput
    colorPattern?: ColorOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type AvatarWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    url?: StringFilter<"Avatar"> | string
    shapeId?: IntFilter<"Avatar"> | number
    eyesId?: IntFilter<"Avatar"> | number
    mouthId?: IntFilter<"Avatar"> | number
    patternId?: IntNullableFilter<"Avatar"> | number | null
    colorShapeId?: IntFilter<"Avatar"> | number
    colorPatternId?: IntNullableFilter<"Avatar"> | number | null
    shape?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    eyes?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    mouth?: XOR<AvatarAssetScalarRelationFilter, AvatarAssetWhereInput>
    pattern?: XOR<AvatarAssetNullableScalarRelationFilter, AvatarAssetWhereInput> | null
    colorShape?: XOR<ColorScalarRelationFilter, ColorWhereInput>
    colorPattern?: XOR<ColorNullableScalarRelationFilter, ColorWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AvatarOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrderInput | SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: AvatarCountOrderByAggregateInput
    _avg?: AvatarAvgOrderByAggregateInput
    _max?: AvatarMaxOrderByAggregateInput
    _min?: AvatarMinOrderByAggregateInput
    _sum?: AvatarSumOrderByAggregateInput
  }

  export type AvatarScalarWhereWithAggregatesInput = {
    AND?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    OR?: AvatarScalarWhereWithAggregatesInput[]
    NOT?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Avatar"> | number
    url?: StringWithAggregatesFilter<"Avatar"> | string
    shapeId?: IntWithAggregatesFilter<"Avatar"> | number
    eyesId?: IntWithAggregatesFilter<"Avatar"> | number
    mouthId?: IntWithAggregatesFilter<"Avatar"> | number
    patternId?: IntNullableWithAggregatesFilter<"Avatar"> | number | null
    colorShapeId?: IntWithAggregatesFilter<"Avatar"> | number
    colorPatternId?: IntNullableWithAggregatesFilter<"Avatar"> | number | null
    userId?: IntWithAggregatesFilter<"Avatar"> | number
  }

  export type ColorWhereInput = {
    AND?: ColorWhereInput | ColorWhereInput[]
    OR?: ColorWhereInput[]
    NOT?: ColorWhereInput | ColorWhereInput[]
    id?: IntFilter<"Color"> | number
    name?: StringFilter<"Color"> | string
    value?: StringFilter<"Color"> | string
    gradientValue?: StringNullableFilter<"Color"> | string | null
    level?: IntFilter<"Color"> | number
    vip?: BoolFilter<"Color"> | boolean
    colorShape?: AvatarListRelationFilter
    colorPattern?: AvatarListRelationFilter
  }

  export type ColorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    gradientValue?: SortOrderInput | SortOrder
    level?: SortOrder
    vip?: SortOrder
    colorShape?: AvatarOrderByRelationAggregateInput
    colorPattern?: AvatarOrderByRelationAggregateInput
  }

  export type ColorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ColorWhereInput | ColorWhereInput[]
    OR?: ColorWhereInput[]
    NOT?: ColorWhereInput | ColorWhereInput[]
    name?: StringFilter<"Color"> | string
    value?: StringFilter<"Color"> | string
    gradientValue?: StringNullableFilter<"Color"> | string | null
    level?: IntFilter<"Color"> | number
    vip?: BoolFilter<"Color"> | boolean
    colorShape?: AvatarListRelationFilter
    colorPattern?: AvatarListRelationFilter
  }, "id">

  export type ColorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    gradientValue?: SortOrderInput | SortOrder
    level?: SortOrder
    vip?: SortOrder
    _count?: ColorCountOrderByAggregateInput
    _avg?: ColorAvgOrderByAggregateInput
    _max?: ColorMaxOrderByAggregateInput
    _min?: ColorMinOrderByAggregateInput
    _sum?: ColorSumOrderByAggregateInput
  }

  export type ColorScalarWhereWithAggregatesInput = {
    AND?: ColorScalarWhereWithAggregatesInput | ColorScalarWhereWithAggregatesInput[]
    OR?: ColorScalarWhereWithAggregatesInput[]
    NOT?: ColorScalarWhereWithAggregatesInput | ColorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Color"> | number
    name?: StringWithAggregatesFilter<"Color"> | string
    value?: StringWithAggregatesFilter<"Color"> | string
    gradientValue?: StringNullableWithAggregatesFilter<"Color"> | string | null
    level?: IntWithAggregatesFilter<"Color"> | number
    vip?: BoolWithAggregatesFilter<"Color"> | boolean
  }

  export type AvatarAssetWhereInput = {
    AND?: AvatarAssetWhereInput | AvatarAssetWhereInput[]
    OR?: AvatarAssetWhereInput[]
    NOT?: AvatarAssetWhereInput | AvatarAssetWhereInput[]
    id?: IntFilter<"AvatarAsset"> | number
    type?: StringFilter<"AvatarAsset"> | string
    name?: StringFilter<"AvatarAsset"> | string
    url?: StringFilter<"AvatarAsset"> | string
    level?: IntFilter<"AvatarAsset"> | number
    vipOnly?: BoolFilter<"AvatarAsset"> | boolean
    shapes?: AvatarListRelationFilter
    eyes?: AvatarListRelationFilter
    mouths?: AvatarListRelationFilter
    patterns?: AvatarListRelationFilter
    userEvents?: UserEventListRelationFilter
  }

  export type AvatarAssetOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    level?: SortOrder
    vipOnly?: SortOrder
    shapes?: AvatarOrderByRelationAggregateInput
    eyes?: AvatarOrderByRelationAggregateInput
    mouths?: AvatarOrderByRelationAggregateInput
    patterns?: AvatarOrderByRelationAggregateInput
    userEvents?: UserEventOrderByRelationAggregateInput
  }

  export type AvatarAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AvatarAssetWhereInput | AvatarAssetWhereInput[]
    OR?: AvatarAssetWhereInput[]
    NOT?: AvatarAssetWhereInput | AvatarAssetWhereInput[]
    type?: StringFilter<"AvatarAsset"> | string
    name?: StringFilter<"AvatarAsset"> | string
    url?: StringFilter<"AvatarAsset"> | string
    level?: IntFilter<"AvatarAsset"> | number
    vipOnly?: BoolFilter<"AvatarAsset"> | boolean
    shapes?: AvatarListRelationFilter
    eyes?: AvatarListRelationFilter
    mouths?: AvatarListRelationFilter
    patterns?: AvatarListRelationFilter
    userEvents?: UserEventListRelationFilter
  }, "id">

  export type AvatarAssetOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    level?: SortOrder
    vipOnly?: SortOrder
    _count?: AvatarAssetCountOrderByAggregateInput
    _avg?: AvatarAssetAvgOrderByAggregateInput
    _max?: AvatarAssetMaxOrderByAggregateInput
    _min?: AvatarAssetMinOrderByAggregateInput
    _sum?: AvatarAssetSumOrderByAggregateInput
  }

  export type AvatarAssetScalarWhereWithAggregatesInput = {
    AND?: AvatarAssetScalarWhereWithAggregatesInput | AvatarAssetScalarWhereWithAggregatesInput[]
    OR?: AvatarAssetScalarWhereWithAggregatesInput[]
    NOT?: AvatarAssetScalarWhereWithAggregatesInput | AvatarAssetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AvatarAsset"> | number
    type?: StringWithAggregatesFilter<"AvatarAsset"> | string
    name?: StringWithAggregatesFilter<"AvatarAsset"> | string
    url?: StringWithAggregatesFilter<"AvatarAsset"> | string
    level?: IntWithAggregatesFilter<"AvatarAsset"> | number
    vipOnly?: BoolWithAggregatesFilter<"AvatarAsset"> | boolean
  }

  export type FriendWhereInput = {
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    id?: IntFilter<"Friend"> | number
    userId?: IntFilter<"Friend"> | number
    friendId?: IntFilter<"Friend"> | number
    status?: StringFilter<"Friend"> | string
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Friend"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
    userEvents?: UserEventListRelationFilter
  }

  export type FriendOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    friend?: UserOrderByWithRelationInput
    userEvents?: UserEventOrderByRelationAggregateInput
  }

  export type FriendWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_friendId?: FriendUserIdFriendIdCompoundUniqueInput
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    userId?: IntFilter<"Friend"> | number
    friendId?: IntFilter<"Friend"> | number
    status?: StringFilter<"Friend"> | string
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Friend"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
    userEvents?: UserEventListRelationFilter
  }, "id" | "userId_friendId">

  export type FriendOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: FriendCountOrderByAggregateInput
    _avg?: FriendAvgOrderByAggregateInput
    _max?: FriendMaxOrderByAggregateInput
    _min?: FriendMinOrderByAggregateInput
    _sum?: FriendSumOrderByAggregateInput
  }

  export type FriendScalarWhereWithAggregatesInput = {
    AND?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    OR?: FriendScalarWhereWithAggregatesInput[]
    NOT?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Friend"> | number
    userId?: IntWithAggregatesFilter<"Friend"> | number
    friendId?: IntWithAggregatesFilter<"Friend"> | number
    status?: StringWithAggregatesFilter<"Friend"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Friend"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Friend"> | Date | string | null
  }

  export type UserStatsWhereInput = {
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    id?: IntFilter<"UserStats"> | number
    userId?: IntFilter<"UserStats"> | number
    xp?: IntFilter<"UserStats"> | number
    level?: IntFilter<"UserStats"> | number
    streak?: IntFilter<"UserStats"> | number
    lastPlayedAt?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastPlayedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    xp?: IntFilter<"UserStats"> | number
    level?: IntFilter<"UserStats"> | number
    streak?: IntFilter<"UserStats"> | number
    lastPlayedAt?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastPlayedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserStatsCountOrderByAggregateInput
    _avg?: UserStatsAvgOrderByAggregateInput
    _max?: UserStatsMaxOrderByAggregateInput
    _min?: UserStatsMinOrderByAggregateInput
    _sum?: UserStatsSumOrderByAggregateInput
  }

  export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    OR?: UserStatsScalarWhereWithAggregatesInput[]
    NOT?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserStats"> | number
    userId?: IntWithAggregatesFilter<"UserStats"> | number
    xp?: IntWithAggregatesFilter<"UserStats"> | number
    level?: IntWithAggregatesFilter<"UserStats"> | number
    streak?: IntWithAggregatesFilter<"UserStats"> | number
    lastPlayedAt?: DateTimeNullableWithAggregatesFilter<"UserStats"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
  }

  export type UserEventWhereInput = {
    AND?: UserEventWhereInput | UserEventWhereInput[]
    OR?: UserEventWhereInput[]
    NOT?: UserEventWhereInput | UserEventWhereInput[]
    id?: IntFilter<"UserEvent"> | number
    userId?: IntFilter<"UserEvent"> | number
    type?: StringFilter<"UserEvent"> | string
    createdAt?: DateTimeFilter<"UserEvent"> | Date | string
    avatarAssetId?: IntNullableFilter<"UserEvent"> | number | null
    friendId?: IntNullableFilter<"UserEvent"> | number | null
    gameResultId?: IntNullableFilter<"UserEvent"> | number | null
    levelUp?: IntNullableFilter<"UserEvent"> | number | null
    attempts?: IntNullableFilter<"UserEvent"> | number | null
    avatarAsset?: XOR<AvatarAssetNullableScalarRelationFilter, AvatarAssetWhereInput> | null
    friend?: XOR<FriendNullableScalarRelationFilter, FriendWhereInput> | null
    gameResult?: XOR<GameResultNullableScalarRelationFilter, GameResultWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    avatarAssetId?: SortOrderInput | SortOrder
    friendId?: SortOrderInput | SortOrder
    gameResultId?: SortOrderInput | SortOrder
    levelUp?: SortOrderInput | SortOrder
    attempts?: SortOrderInput | SortOrder
    avatarAsset?: AvatarAssetOrderByWithRelationInput
    friend?: FriendOrderByWithRelationInput
    gameResult?: GameResultOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserEventWhereInput | UserEventWhereInput[]
    OR?: UserEventWhereInput[]
    NOT?: UserEventWhereInput | UserEventWhereInput[]
    userId?: IntFilter<"UserEvent"> | number
    type?: StringFilter<"UserEvent"> | string
    createdAt?: DateTimeFilter<"UserEvent"> | Date | string
    avatarAssetId?: IntNullableFilter<"UserEvent"> | number | null
    friendId?: IntNullableFilter<"UserEvent"> | number | null
    gameResultId?: IntNullableFilter<"UserEvent"> | number | null
    levelUp?: IntNullableFilter<"UserEvent"> | number | null
    attempts?: IntNullableFilter<"UserEvent"> | number | null
    avatarAsset?: XOR<AvatarAssetNullableScalarRelationFilter, AvatarAssetWhereInput> | null
    friend?: XOR<FriendNullableScalarRelationFilter, FriendWhereInput> | null
    gameResult?: XOR<GameResultNullableScalarRelationFilter, GameResultWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    avatarAssetId?: SortOrderInput | SortOrder
    friendId?: SortOrderInput | SortOrder
    gameResultId?: SortOrderInput | SortOrder
    levelUp?: SortOrderInput | SortOrder
    attempts?: SortOrderInput | SortOrder
    _count?: UserEventCountOrderByAggregateInput
    _avg?: UserEventAvgOrderByAggregateInput
    _max?: UserEventMaxOrderByAggregateInput
    _min?: UserEventMinOrderByAggregateInput
    _sum?: UserEventSumOrderByAggregateInput
  }

  export type UserEventScalarWhereWithAggregatesInput = {
    AND?: UserEventScalarWhereWithAggregatesInput | UserEventScalarWhereWithAggregatesInput[]
    OR?: UserEventScalarWhereWithAggregatesInput[]
    NOT?: UserEventScalarWhereWithAggregatesInput | UserEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserEvent"> | number
    userId?: IntWithAggregatesFilter<"UserEvent"> | number
    type?: StringWithAggregatesFilter<"UserEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserEvent"> | Date | string
    avatarAssetId?: IntNullableWithAggregatesFilter<"UserEvent"> | number | null
    friendId?: IntNullableWithAggregatesFilter<"UserEvent"> | number | null
    gameResultId?: IntNullableWithAggregatesFilter<"UserEvent"> | number | null
    levelUp?: IntNullableWithAggregatesFilter<"UserEvent"> | number | null
    attempts?: IntNullableWithAggregatesFilter<"UserEvent"> | number | null
  }

  export type GameResultWhereInput = {
    AND?: GameResultWhereInput | GameResultWhereInput[]
    OR?: GameResultWhereInput[]
    NOT?: GameResultWhereInput | GameResultWhereInput[]
    id?: IntFilter<"GameResult"> | number
    userId?: IntFilter<"GameResult"> | number
    gameId?: IntFilter<"GameResult"> | number
    score?: IntFilter<"GameResult"> | number
    xpGained?: IntFilter<"GameResult"> | number
    status?: StringFilter<"GameResult"> | string
    date?: DateTimeFilter<"GameResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"GameResult"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    userEvents?: UserEventListRelationFilter
  }

  export type GameResultOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
    status?: SortOrder
    date?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    game?: GameOrderByWithRelationInput
    userEvents?: UserEventOrderByRelationAggregateInput
  }

  export type GameResultWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameResultWhereInput | GameResultWhereInput[]
    OR?: GameResultWhereInput[]
    NOT?: GameResultWhereInput | GameResultWhereInput[]
    userId?: IntFilter<"GameResult"> | number
    gameId?: IntFilter<"GameResult"> | number
    score?: IntFilter<"GameResult"> | number
    xpGained?: IntFilter<"GameResult"> | number
    status?: StringFilter<"GameResult"> | string
    date?: DateTimeFilter<"GameResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"GameResult"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    userEvents?: UserEventListRelationFilter
  }, "id">

  export type GameResultOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
    status?: SortOrder
    date?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: GameResultCountOrderByAggregateInput
    _avg?: GameResultAvgOrderByAggregateInput
    _max?: GameResultMaxOrderByAggregateInput
    _min?: GameResultMinOrderByAggregateInput
    _sum?: GameResultSumOrderByAggregateInput
  }

  export type GameResultScalarWhereWithAggregatesInput = {
    AND?: GameResultScalarWhereWithAggregatesInput | GameResultScalarWhereWithAggregatesInput[]
    OR?: GameResultScalarWhereWithAggregatesInput[]
    NOT?: GameResultScalarWhereWithAggregatesInput | GameResultScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameResult"> | number
    userId?: IntWithAggregatesFilter<"GameResult"> | number
    gameId?: IntWithAggregatesFilter<"GameResult"> | number
    score?: IntWithAggregatesFilter<"GameResult"> | number
    xpGained?: IntWithAggregatesFilter<"GameResult"> | number
    status?: StringWithAggregatesFilter<"GameResult"> | string
    date?: DateTimeWithAggregatesFilter<"GameResult"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"GameResult"> | Date | string | null
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    name?: StringFilter<"Game"> | string
    description?: StringFilter<"Game"> | string
    imgUrl?: StringNullableFilter<"Game"> | string | null
    path?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    gameCategoryId?: IntFilter<"Game"> | number
    status?: StringFilter<"Game"> | string
    gameCategory?: XOR<GameCategoryScalarRelationFilter, GameCategoryWhereInput>
    results?: GameResultListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imgUrl?: SortOrderInput | SortOrder
    path?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    gameCategoryId?: SortOrder
    status?: SortOrder
    gameCategory?: GameCategoryOrderByWithRelationInput
    results?: GameResultOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    name?: StringFilter<"Game"> | string
    description?: StringFilter<"Game"> | string
    imgUrl?: StringNullableFilter<"Game"> | string | null
    path?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    gameCategoryId?: IntFilter<"Game"> | number
    status?: StringFilter<"Game"> | string
    gameCategory?: XOR<GameCategoryScalarRelationFilter, GameCategoryWhereInput>
    results?: GameResultListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imgUrl?: SortOrderInput | SortOrder
    path?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    gameCategoryId?: SortOrder
    status?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    name?: StringWithAggregatesFilter<"Game"> | string
    description?: StringWithAggregatesFilter<"Game"> | string
    imgUrl?: StringNullableWithAggregatesFilter<"Game"> | string | null
    path?: StringWithAggregatesFilter<"Game"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    gameCategoryId?: IntWithAggregatesFilter<"Game"> | number
    status?: StringWithAggregatesFilter<"Game"> | string
  }

  export type GameCategoryWhereInput = {
    AND?: GameCategoryWhereInput | GameCategoryWhereInput[]
    OR?: GameCategoryWhereInput[]
    NOT?: GameCategoryWhereInput | GameCategoryWhereInput[]
    id?: IntFilter<"GameCategory"> | number
    name?: StringFilter<"GameCategory"> | string
    createdAt?: DateTimeFilter<"GameCategory"> | Date | string
    updatedAt?: DateTimeFilter<"GameCategory"> | Date | string
    deletedAt?: DateTimeNullableFilter<"GameCategory"> | Date | string | null
    color?: StringNullableFilter<"GameCategory"> | string | null
    games?: GameListRelationFilter
  }

  export type GameCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    games?: GameOrderByRelationAggregateInput
  }

  export type GameCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameCategoryWhereInput | GameCategoryWhereInput[]
    OR?: GameCategoryWhereInput[]
    NOT?: GameCategoryWhereInput | GameCategoryWhereInput[]
    name?: StringFilter<"GameCategory"> | string
    createdAt?: DateTimeFilter<"GameCategory"> | Date | string
    updatedAt?: DateTimeFilter<"GameCategory"> | Date | string
    deletedAt?: DateTimeNullableFilter<"GameCategory"> | Date | string | null
    color?: StringNullableFilter<"GameCategory"> | string | null
    games?: GameListRelationFilter
  }, "id">

  export type GameCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    _count?: GameCategoryCountOrderByAggregateInput
    _avg?: GameCategoryAvgOrderByAggregateInput
    _max?: GameCategoryMaxOrderByAggregateInput
    _min?: GameCategoryMinOrderByAggregateInput
    _sum?: GameCategorySumOrderByAggregateInput
  }

  export type GameCategoryScalarWhereWithAggregatesInput = {
    AND?: GameCategoryScalarWhereWithAggregatesInput | GameCategoryScalarWhereWithAggregatesInput[]
    OR?: GameCategoryScalarWhereWithAggregatesInput[]
    NOT?: GameCategoryScalarWhereWithAggregatesInput | GameCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameCategory"> | number
    name?: StringWithAggregatesFilter<"GameCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GameCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameCategory"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"GameCategory"> | Date | string | null
    color?: StringNullableWithAggregatesFilter<"GameCategory"> | string | null
  }

  export type DataMovieWhereInput = {
    AND?: DataMovieWhereInput | DataMovieWhereInput[]
    OR?: DataMovieWhereInput[]
    NOT?: DataMovieWhereInput | DataMovieWhereInput[]
    id?: IntFilter<"DataMovie"> | number
    tmdbId?: IntFilter<"DataMovie"> | number
    title?: StringFilter<"DataMovie"> | string
    originalTitle?: StringFilter<"DataMovie"> | string
    year?: IntFilter<"DataMovie"> | number
    releaseDate?: DateTimeFilter<"DataMovie"> | Date | string
    runtime?: IntNullableFilter<"DataMovie"> | number | null
    director?: StringNullableFilter<"DataMovie"> | string | null
    actors?: StringNullableFilter<"DataMovie"> | string | null
    genres?: StringFilter<"DataMovie"> | string
    synopsis?: StringNullableFilter<"DataMovie"> | string | null
    production?: StringNullableFilter<"DataMovie"> | string | null
    country?: StringNullableFilter<"DataMovie"> | string | null
    language?: StringNullableFilter<"DataMovie"> | string | null
    voteAverage?: FloatNullableFilter<"DataMovie"> | number | null
    voteCount?: IntNullableFilter<"DataMovie"> | number | null
    popularity?: FloatNullableFilter<"DataMovie"> | number | null
    budget?: IntNullableFilter<"DataMovie"> | number | null
    keywords?: StringNullableFilter<"DataMovie"> | string | null
    posterPath?: StringNullableFilter<"DataMovie"> | string | null
    backdropPath?: StringNullableFilter<"DataMovie"> | string | null
    image1?: StringNullableFilter<"DataMovie"> | string | null
    image2?: StringNullableFilter<"DataMovie"> | string | null
    image3?: StringNullableFilter<"DataMovie"> | string | null
    image4?: StringNullableFilter<"DataMovie"> | string | null
    image5?: StringNullableFilter<"DataMovie"> | string | null
    image6?: StringNullableFilter<"DataMovie"> | string | null
    image7?: StringNullableFilter<"DataMovie"> | string | null
    image8?: StringNullableFilter<"DataMovie"> | string | null
    image9?: StringNullableFilter<"DataMovie"> | string | null
    image10?: StringNullableFilter<"DataMovie"> | string | null
    createdAt?: DateTimeFilter<"DataMovie"> | Date | string
    gameDays?: GameCinema1DaysListRelationFilter
  }

  export type DataMovieOrderByWithRelationInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    title?: SortOrder
    originalTitle?: SortOrder
    year?: SortOrder
    releaseDate?: SortOrder
    runtime?: SortOrderInput | SortOrder
    director?: SortOrderInput | SortOrder
    actors?: SortOrderInput | SortOrder
    genres?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    production?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    voteAverage?: SortOrderInput | SortOrder
    voteCount?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    posterPath?: SortOrderInput | SortOrder
    backdropPath?: SortOrderInput | SortOrder
    image1?: SortOrderInput | SortOrder
    image2?: SortOrderInput | SortOrder
    image3?: SortOrderInput | SortOrder
    image4?: SortOrderInput | SortOrder
    image5?: SortOrderInput | SortOrder
    image6?: SortOrderInput | SortOrder
    image7?: SortOrderInput | SortOrder
    image8?: SortOrderInput | SortOrder
    image9?: SortOrderInput | SortOrder
    image10?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    gameDays?: GameCinema1DaysOrderByRelationAggregateInput
  }

  export type DataMovieWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tmdbId?: number
    AND?: DataMovieWhereInput | DataMovieWhereInput[]
    OR?: DataMovieWhereInput[]
    NOT?: DataMovieWhereInput | DataMovieWhereInput[]
    title?: StringFilter<"DataMovie"> | string
    originalTitle?: StringFilter<"DataMovie"> | string
    year?: IntFilter<"DataMovie"> | number
    releaseDate?: DateTimeFilter<"DataMovie"> | Date | string
    runtime?: IntNullableFilter<"DataMovie"> | number | null
    director?: StringNullableFilter<"DataMovie"> | string | null
    actors?: StringNullableFilter<"DataMovie"> | string | null
    genres?: StringFilter<"DataMovie"> | string
    synopsis?: StringNullableFilter<"DataMovie"> | string | null
    production?: StringNullableFilter<"DataMovie"> | string | null
    country?: StringNullableFilter<"DataMovie"> | string | null
    language?: StringNullableFilter<"DataMovie"> | string | null
    voteAverage?: FloatNullableFilter<"DataMovie"> | number | null
    voteCount?: IntNullableFilter<"DataMovie"> | number | null
    popularity?: FloatNullableFilter<"DataMovie"> | number | null
    budget?: IntNullableFilter<"DataMovie"> | number | null
    keywords?: StringNullableFilter<"DataMovie"> | string | null
    posterPath?: StringNullableFilter<"DataMovie"> | string | null
    backdropPath?: StringNullableFilter<"DataMovie"> | string | null
    image1?: StringNullableFilter<"DataMovie"> | string | null
    image2?: StringNullableFilter<"DataMovie"> | string | null
    image3?: StringNullableFilter<"DataMovie"> | string | null
    image4?: StringNullableFilter<"DataMovie"> | string | null
    image5?: StringNullableFilter<"DataMovie"> | string | null
    image6?: StringNullableFilter<"DataMovie"> | string | null
    image7?: StringNullableFilter<"DataMovie"> | string | null
    image8?: StringNullableFilter<"DataMovie"> | string | null
    image9?: StringNullableFilter<"DataMovie"> | string | null
    image10?: StringNullableFilter<"DataMovie"> | string | null
    createdAt?: DateTimeFilter<"DataMovie"> | Date | string
    gameDays?: GameCinema1DaysListRelationFilter
  }, "id" | "tmdbId">

  export type DataMovieOrderByWithAggregationInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    title?: SortOrder
    originalTitle?: SortOrder
    year?: SortOrder
    releaseDate?: SortOrder
    runtime?: SortOrderInput | SortOrder
    director?: SortOrderInput | SortOrder
    actors?: SortOrderInput | SortOrder
    genres?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    production?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    voteAverage?: SortOrderInput | SortOrder
    voteCount?: SortOrderInput | SortOrder
    popularity?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    posterPath?: SortOrderInput | SortOrder
    backdropPath?: SortOrderInput | SortOrder
    image1?: SortOrderInput | SortOrder
    image2?: SortOrderInput | SortOrder
    image3?: SortOrderInput | SortOrder
    image4?: SortOrderInput | SortOrder
    image5?: SortOrderInput | SortOrder
    image6?: SortOrderInput | SortOrder
    image7?: SortOrderInput | SortOrder
    image8?: SortOrderInput | SortOrder
    image9?: SortOrderInput | SortOrder
    image10?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DataMovieCountOrderByAggregateInput
    _avg?: DataMovieAvgOrderByAggregateInput
    _max?: DataMovieMaxOrderByAggregateInput
    _min?: DataMovieMinOrderByAggregateInput
    _sum?: DataMovieSumOrderByAggregateInput
  }

  export type DataMovieScalarWhereWithAggregatesInput = {
    AND?: DataMovieScalarWhereWithAggregatesInput | DataMovieScalarWhereWithAggregatesInput[]
    OR?: DataMovieScalarWhereWithAggregatesInput[]
    NOT?: DataMovieScalarWhereWithAggregatesInput | DataMovieScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DataMovie"> | number
    tmdbId?: IntWithAggregatesFilter<"DataMovie"> | number
    title?: StringWithAggregatesFilter<"DataMovie"> | string
    originalTitle?: StringWithAggregatesFilter<"DataMovie"> | string
    year?: IntWithAggregatesFilter<"DataMovie"> | number
    releaseDate?: DateTimeWithAggregatesFilter<"DataMovie"> | Date | string
    runtime?: IntNullableWithAggregatesFilter<"DataMovie"> | number | null
    director?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    actors?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    genres?: StringWithAggregatesFilter<"DataMovie"> | string
    synopsis?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    production?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    country?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    language?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    voteAverage?: FloatNullableWithAggregatesFilter<"DataMovie"> | number | null
    voteCount?: IntNullableWithAggregatesFilter<"DataMovie"> | number | null
    popularity?: FloatNullableWithAggregatesFilter<"DataMovie"> | number | null
    budget?: IntNullableWithAggregatesFilter<"DataMovie"> | number | null
    keywords?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    posterPath?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    backdropPath?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image1?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image2?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image3?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image4?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image5?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image6?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image7?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image8?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image9?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    image10?: StringNullableWithAggregatesFilter<"DataMovie"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DataMovie"> | Date | string
  }

  export type GameCinema1DaysWhereInput = {
    AND?: GameCinema1DaysWhereInput | GameCinema1DaysWhereInput[]
    OR?: GameCinema1DaysWhereInput[]
    NOT?: GameCinema1DaysWhereInput | GameCinema1DaysWhereInput[]
    id?: IntFilter<"GameCinema1Days"> | number
    date?: DateTimeFilter<"GameCinema1Days"> | Date | string
    movieId?: IntFilter<"GameCinema1Days"> | number
    createdAt?: DateTimeFilter<"GameCinema1Days"> | Date | string
    movie?: XOR<DataMovieScalarRelationFilter, DataMovieWhereInput>
    tries?: GameCinema1TriesListRelationFilter
  }

  export type GameCinema1DaysOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    movieId?: SortOrder
    createdAt?: SortOrder
    movie?: DataMovieOrderByWithRelationInput
    tries?: GameCinema1TriesOrderByRelationAggregateInput
  }

  export type GameCinema1DaysWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    date?: Date | string
    AND?: GameCinema1DaysWhereInput | GameCinema1DaysWhereInput[]
    OR?: GameCinema1DaysWhereInput[]
    NOT?: GameCinema1DaysWhereInput | GameCinema1DaysWhereInput[]
    movieId?: IntFilter<"GameCinema1Days"> | number
    createdAt?: DateTimeFilter<"GameCinema1Days"> | Date | string
    movie?: XOR<DataMovieScalarRelationFilter, DataMovieWhereInput>
    tries?: GameCinema1TriesListRelationFilter
  }, "id" | "date">

  export type GameCinema1DaysOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    movieId?: SortOrder
    createdAt?: SortOrder
    _count?: GameCinema1DaysCountOrderByAggregateInput
    _avg?: GameCinema1DaysAvgOrderByAggregateInput
    _max?: GameCinema1DaysMaxOrderByAggregateInput
    _min?: GameCinema1DaysMinOrderByAggregateInput
    _sum?: GameCinema1DaysSumOrderByAggregateInput
  }

  export type GameCinema1DaysScalarWhereWithAggregatesInput = {
    AND?: GameCinema1DaysScalarWhereWithAggregatesInput | GameCinema1DaysScalarWhereWithAggregatesInput[]
    OR?: GameCinema1DaysScalarWhereWithAggregatesInput[]
    NOT?: GameCinema1DaysScalarWhereWithAggregatesInput | GameCinema1DaysScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameCinema1Days"> | number
    date?: DateTimeWithAggregatesFilter<"GameCinema1Days"> | Date | string
    movieId?: IntWithAggregatesFilter<"GameCinema1Days"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GameCinema1Days"> | Date | string
  }

  export type GameCinema1TriesWhereInput = {
    AND?: GameCinema1TriesWhereInput | GameCinema1TriesWhereInput[]
    OR?: GameCinema1TriesWhereInput[]
    NOT?: GameCinema1TriesWhereInput | GameCinema1TriesWhereInput[]
    id?: IntFilter<"GameCinema1Tries"> | number
    userId?: IntFilter<"GameCinema1Tries"> | number
    dayId?: IntFilter<"GameCinema1Tries"> | number
    guess?: StringFilter<"GameCinema1Tries"> | string
    correct?: BoolFilter<"GameCinema1Tries"> | boolean
    createdAt?: DateTimeFilter<"GameCinema1Tries"> | Date | string
    day?: XOR<GameCinema1DaysScalarRelationFilter, GameCinema1DaysWhereInput>
  }

  export type GameCinema1TriesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
    guess?: SortOrder
    correct?: SortOrder
    createdAt?: SortOrder
    day?: GameCinema1DaysOrderByWithRelationInput
  }

  export type GameCinema1TriesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameCinema1TriesWhereInput | GameCinema1TriesWhereInput[]
    OR?: GameCinema1TriesWhereInput[]
    NOT?: GameCinema1TriesWhereInput | GameCinema1TriesWhereInput[]
    userId?: IntFilter<"GameCinema1Tries"> | number
    dayId?: IntFilter<"GameCinema1Tries"> | number
    guess?: StringFilter<"GameCinema1Tries"> | string
    correct?: BoolFilter<"GameCinema1Tries"> | boolean
    createdAt?: DateTimeFilter<"GameCinema1Tries"> | Date | string
    day?: XOR<GameCinema1DaysScalarRelationFilter, GameCinema1DaysWhereInput>
  }, "id">

  export type GameCinema1TriesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
    guess?: SortOrder
    correct?: SortOrder
    createdAt?: SortOrder
    _count?: GameCinema1TriesCountOrderByAggregateInput
    _avg?: GameCinema1TriesAvgOrderByAggregateInput
    _max?: GameCinema1TriesMaxOrderByAggregateInput
    _min?: GameCinema1TriesMinOrderByAggregateInput
    _sum?: GameCinema1TriesSumOrderByAggregateInput
  }

  export type GameCinema1TriesScalarWhereWithAggregatesInput = {
    AND?: GameCinema1TriesScalarWhereWithAggregatesInput | GameCinema1TriesScalarWhereWithAggregatesInput[]
    OR?: GameCinema1TriesScalarWhereWithAggregatesInput[]
    NOT?: GameCinema1TriesScalarWhereWithAggregatesInput | GameCinema1TriesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GameCinema1Tries"> | number
    userId?: IntWithAggregatesFilter<"GameCinema1Tries"> | number
    dayId?: IntWithAggregatesFilter<"GameCinema1Tries"> | number
    guess?: StringWithAggregatesFilter<"GameCinema1Tries"> | string
    correct?: BoolWithAggregatesFilter<"GameCinema1Tries"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"GameCinema1Tries"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friends?: FriendCreateNestedManyWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friends?: FriendUpdateManyWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AvatarCreateInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarCreateManyInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AvatarUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ColorCreateInput = {
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorShape?: AvatarCreateNestedManyWithoutColorShapeInput
    colorPattern?: AvatarCreateNestedManyWithoutColorPatternInput
  }

  export type ColorUncheckedCreateInput = {
    id?: number
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorShape?: AvatarUncheckedCreateNestedManyWithoutColorShapeInput
    colorPattern?: AvatarUncheckedCreateNestedManyWithoutColorPatternInput
  }

  export type ColorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorShape?: AvatarUpdateManyWithoutColorShapeNestedInput
    colorPattern?: AvatarUpdateManyWithoutColorPatternNestedInput
  }

  export type ColorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorShape?: AvatarUncheckedUpdateManyWithoutColorShapeNestedInput
    colorPattern?: AvatarUncheckedUpdateManyWithoutColorPatternNestedInput
  }

  export type ColorCreateManyInput = {
    id?: number
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
  }

  export type ColorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ColorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AvatarAssetCreateInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarCreateNestedManyWithoutShapeInput
    eyes?: AvatarCreateNestedManyWithoutEyesInput
    mouths?: AvatarCreateNestedManyWithoutMouthInput
    patterns?: AvatarCreateNestedManyWithoutPatternInput
    userEvents?: UserEventCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUncheckedCreateInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarUncheckedCreateNestedManyWithoutShapeInput
    eyes?: AvatarUncheckedCreateNestedManyWithoutEyesInput
    mouths?: AvatarUncheckedCreateNestedManyWithoutMouthInput
    patterns?: AvatarUncheckedCreateNestedManyWithoutPatternInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUncheckedUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUncheckedUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUncheckedUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUncheckedUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetCreateManyInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
  }

  export type AvatarAssetUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AvatarAssetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FriendCreateInput = {
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFriendsInput
    friend: UserCreateNestedOneWithoutFriendInput
    userEvents?: UserEventCreateNestedManyWithoutFriendInput
  }

  export type FriendUncheckedCreateInput = {
    id?: number
    userId: number
    friendId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutFriendInput
  }

  export type FriendUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFriendsNestedInput
    friend?: UserUpdateOneRequiredWithoutFriendNestedInput
    userEvents?: UserEventUpdateManyWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    friendId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutFriendNestedInput
  }

  export type FriendCreateManyInput = {
    id?: number
    userId: number
    friendId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FriendUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FriendUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    friendId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserStatsCreateInput = {
    xp?: number
    level?: number
    streak?: number
    lastPlayedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserStatsInput
  }

  export type UserStatsUncheckedCreateInput = {
    id?: number
    userId: number
    xp?: number
    level?: number
    streak?: number
    lastPlayedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUpdateInput = {
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserStatsNestedInput
  }

  export type UserStatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsCreateManyInput = {
    id?: number
    userId: number
    xp?: number
    level?: number
    streak?: number
    lastPlayedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUpdateManyMutationInput = {
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventCreateInput = {
    type: string
    createdAt?: Date | string
    levelUp?: number | null
    attempts?: number | null
    avatarAsset?: AvatarAssetCreateNestedOneWithoutUserEventsInput
    friend?: FriendCreateNestedOneWithoutUserEventsInput
    gameResult?: GameResultCreateNestedOneWithoutUserEventsInput
    user: UserCreateNestedOneWithoutUserEventsInput
  }

  export type UserEventUncheckedCreateInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
    avatarAsset?: AvatarAssetUpdateOneWithoutUserEventsNestedInput
    friend?: FriendUpdateOneWithoutUserEventsNestedInput
    gameResult?: GameResultUpdateOneWithoutUserEventsNestedInput
    user?: UserUpdateOneRequiredWithoutUserEventsNestedInput
  }

  export type UserEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventCreateManyInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameResultCreateInput = {
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGameResultsInput
    game: GameCreateNestedOneWithoutResultsInput
    userEvents?: UserEventCreateNestedManyWithoutGameResultInput
  }

  export type GameResultUncheckedCreateInput = {
    id?: number
    userId: number
    gameId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutGameResultInput
  }

  export type GameResultUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGameResultsNestedInput
    game?: GameUpdateOneRequiredWithoutResultsNestedInput
    userEvents?: UserEventUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
  }

  export type GameResultUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameCreateInput = {
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    status?: string
    gameCategory: GameCategoryCreateNestedOneWithoutGamesInput
    results?: GameResultCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    gameCategoryId: number
    status?: string
    results?: GameResultUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gameCategory?: GameCategoryUpdateOneRequiredWithoutGamesNestedInput
    results?: GameResultUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameCategoryId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    results?: GameResultUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    gameCategoryId: number
    status?: string
  }

  export type GameUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameCategoryId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type GameCategoryCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    color?: string | null
    games?: GameCreateNestedManyWithoutGameCategoryInput
  }

  export type GameCategoryUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    color?: string | null
    games?: GameUncheckedCreateNestedManyWithoutGameCategoryInput
  }

  export type GameCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    games?: GameUpdateManyWithoutGameCategoryNestedInput
  }

  export type GameCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    games?: GameUncheckedUpdateManyWithoutGameCategoryNestedInput
  }

  export type GameCategoryCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    color?: string | null
  }

  export type GameCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DataMovieCreateInput = {
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date | string
    runtime?: number | null
    director?: string | null
    actors?: string | null
    genres: string
    synopsis?: string | null
    production?: string | null
    country?: string | null
    language?: string | null
    voteAverage?: number | null
    voteCount?: number | null
    popularity?: number | null
    budget?: number | null
    keywords?: string | null
    posterPath?: string | null
    backdropPath?: string | null
    image1?: string | null
    image2?: string | null
    image3?: string | null
    image4?: string | null
    image5?: string | null
    image6?: string | null
    image7?: string | null
    image8?: string | null
    image9?: string | null
    image10?: string | null
    createdAt?: Date | string
    gameDays?: GameCinema1DaysCreateNestedManyWithoutMovieInput
  }

  export type DataMovieUncheckedCreateInput = {
    id?: number
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date | string
    runtime?: number | null
    director?: string | null
    actors?: string | null
    genres: string
    synopsis?: string | null
    production?: string | null
    country?: string | null
    language?: string | null
    voteAverage?: number | null
    voteCount?: number | null
    popularity?: number | null
    budget?: number | null
    keywords?: string | null
    posterPath?: string | null
    backdropPath?: string | null
    image1?: string | null
    image2?: string | null
    image3?: string | null
    image4?: string | null
    image5?: string | null
    image6?: string | null
    image7?: string | null
    image8?: string | null
    image9?: string | null
    image10?: string | null
    createdAt?: Date | string
    gameDays?: GameCinema1DaysUncheckedCreateNestedManyWithoutMovieInput
  }

  export type DataMovieUpdateInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameDays?: GameCinema1DaysUpdateManyWithoutMovieNestedInput
  }

  export type DataMovieUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameDays?: GameCinema1DaysUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type DataMovieCreateManyInput = {
    id?: number
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date | string
    runtime?: number | null
    director?: string | null
    actors?: string | null
    genres: string
    synopsis?: string | null
    production?: string | null
    country?: string | null
    language?: string | null
    voteAverage?: number | null
    voteCount?: number | null
    popularity?: number | null
    budget?: number | null
    keywords?: string | null
    posterPath?: string | null
    backdropPath?: string | null
    image1?: string | null
    image2?: string | null
    image3?: string | null
    image4?: string | null
    image5?: string | null
    image6?: string | null
    image7?: string | null
    image8?: string | null
    image9?: string | null
    image10?: string | null
    createdAt?: Date | string
  }

  export type DataMovieUpdateManyMutationInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMovieUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1DaysCreateInput = {
    date: Date | string
    createdAt?: Date | string
    movie: DataMovieCreateNestedOneWithoutGameDaysInput
    tries?: GameCinema1TriesCreateNestedManyWithoutDayInput
  }

  export type GameCinema1DaysUncheckedCreateInput = {
    id?: number
    date: Date | string
    movieId: number
    createdAt?: Date | string
    tries?: GameCinema1TriesUncheckedCreateNestedManyWithoutDayInput
  }

  export type GameCinema1DaysUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: DataMovieUpdateOneRequiredWithoutGameDaysNestedInput
    tries?: GameCinema1TriesUpdateManyWithoutDayNestedInput
  }

  export type GameCinema1DaysUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    movieId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tries?: GameCinema1TriesUncheckedUpdateManyWithoutDayNestedInput
  }

  export type GameCinema1DaysCreateManyInput = {
    id?: number
    date: Date | string
    movieId: number
    createdAt?: Date | string
  }

  export type GameCinema1DaysUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1DaysUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    movieId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesCreateInput = {
    userId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
    day: GameCinema1DaysCreateNestedOneWithoutTriesInput
  }

  export type GameCinema1TriesUncheckedCreateInput = {
    id?: number
    userId: number
    dayId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
  }

  export type GameCinema1TriesUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    day?: GameCinema1DaysUpdateOneRequiredWithoutTriesNestedInput
  }

  export type GameCinema1TriesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dayId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesCreateManyInput = {
    id?: number
    userId: number
    dayId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
  }

  export type GameCinema1TriesUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dayId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AvatarNullableScalarRelationFilter = {
    is?: AvatarWhereInput | null
    isNot?: AvatarWhereInput | null
  }

  export type FriendListRelationFilter = {
    every?: FriendWhereInput
    some?: FriendWhereInput
    none?: FriendWhereInput
  }

  export type UserStatsNullableScalarRelationFilter = {
    is?: UserStatsWhereInput | null
    isNot?: UserStatsWhereInput | null
  }

  export type UserEventListRelationFilter = {
    every?: UserEventWhereInput
    some?: UserEventWhereInput
    none?: UserEventWhereInput
  }

  export type GameResultListRelationFilter = {
    every?: GameResultWhereInput
    some?: GameResultWhereInput
    none?: GameResultWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FriendOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    pseudo?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthdate?: SortOrder
    isVip?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    pseudo?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthdate?: SortOrder
    isVip?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    pseudo?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthdate?: SortOrder
    isVip?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AvatarAssetScalarRelationFilter = {
    is?: AvatarAssetWhereInput
    isNot?: AvatarAssetWhereInput
  }

  export type AvatarAssetNullableScalarRelationFilter = {
    is?: AvatarAssetWhereInput | null
    isNot?: AvatarAssetWhereInput | null
  }

  export type ColorScalarRelationFilter = {
    is?: ColorWhereInput
    isNot?: ColorWhereInput
  }

  export type ColorNullableScalarRelationFilter = {
    is?: ColorWhereInput | null
    isNot?: ColorWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AvatarCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrder
    userId?: SortOrder
  }

  export type AvatarAvgOrderByAggregateInput = {
    id?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrder
    userId?: SortOrder
  }

  export type AvatarMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrder
    userId?: SortOrder
  }

  export type AvatarMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrder
    userId?: SortOrder
  }

  export type AvatarSumOrderByAggregateInput = {
    id?: SortOrder
    shapeId?: SortOrder
    eyesId?: SortOrder
    mouthId?: SortOrder
    patternId?: SortOrder
    colorShapeId?: SortOrder
    colorPatternId?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AvatarListRelationFilter = {
    every?: AvatarWhereInput
    some?: AvatarWhereInput
    none?: AvatarWhereInput
  }

  export type AvatarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    gradientValue?: SortOrder
    level?: SortOrder
    vip?: SortOrder
  }

  export type ColorAvgOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type ColorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    gradientValue?: SortOrder
    level?: SortOrder
    vip?: SortOrder
  }

  export type ColorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    gradientValue?: SortOrder
    level?: SortOrder
    vip?: SortOrder
  }

  export type ColorSumOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type AvatarAssetCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    level?: SortOrder
    vipOnly?: SortOrder
  }

  export type AvatarAssetAvgOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type AvatarAssetMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    level?: SortOrder
    vipOnly?: SortOrder
  }

  export type AvatarAssetMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    url?: SortOrder
    level?: SortOrder
    vipOnly?: SortOrder
  }

  export type AvatarAssetSumOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type FriendUserIdFriendIdCompoundUniqueInput = {
    userId: number
    friendId: number
  }

  export type FriendCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FriendAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
  }

  export type FriendMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FriendMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type FriendSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
  }

  export type UserStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastPlayedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type UserStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastPlayedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastPlayedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type FriendNullableScalarRelationFilter = {
    is?: FriendWhereInput | null
    isNot?: FriendWhereInput | null
  }

  export type GameResultNullableScalarRelationFilter = {
    is?: GameResultWhereInput | null
    isNot?: GameResultWhereInput | null
  }

  export type UserEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    avatarAssetId?: SortOrder
    friendId?: SortOrder
    gameResultId?: SortOrder
    levelUp?: SortOrder
    attempts?: SortOrder
  }

  export type UserEventAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarAssetId?: SortOrder
    friendId?: SortOrder
    gameResultId?: SortOrder
    levelUp?: SortOrder
    attempts?: SortOrder
  }

  export type UserEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    avatarAssetId?: SortOrder
    friendId?: SortOrder
    gameResultId?: SortOrder
    levelUp?: SortOrder
    attempts?: SortOrder
  }

  export type UserEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    avatarAssetId?: SortOrder
    friendId?: SortOrder
    gameResultId?: SortOrder
    levelUp?: SortOrder
    attempts?: SortOrder
  }

  export type UserEventSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarAssetId?: SortOrder
    friendId?: SortOrder
    gameResultId?: SortOrder
    levelUp?: SortOrder
    attempts?: SortOrder
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type GameResultCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
    status?: SortOrder
    date?: SortOrder
    deletedAt?: SortOrder
  }

  export type GameResultAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
  }

  export type GameResultMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
    status?: SortOrder
    date?: SortOrder
    deletedAt?: SortOrder
  }

  export type GameResultMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
    status?: SortOrder
    date?: SortOrder
    deletedAt?: SortOrder
  }

  export type GameResultSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    xpGained?: SortOrder
  }

  export type GameCategoryScalarRelationFilter = {
    is?: GameCategoryWhereInput
    isNot?: GameCategoryWhereInput
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imgUrl?: SortOrder
    path?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    gameCategoryId?: SortOrder
    status?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    gameCategoryId?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imgUrl?: SortOrder
    path?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    gameCategoryId?: SortOrder
    status?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imgUrl?: SortOrder
    path?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    gameCategoryId?: SortOrder
    status?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    gameCategoryId?: SortOrder
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    color?: SortOrder
  }

  export type GameCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GameCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    color?: SortOrder
  }

  export type GameCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    color?: SortOrder
  }

  export type GameCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type GameCinema1DaysListRelationFilter = {
    every?: GameCinema1DaysWhereInput
    some?: GameCinema1DaysWhereInput
    none?: GameCinema1DaysWhereInput
  }

  export type GameCinema1DaysOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DataMovieCountOrderByAggregateInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    title?: SortOrder
    originalTitle?: SortOrder
    year?: SortOrder
    releaseDate?: SortOrder
    runtime?: SortOrder
    director?: SortOrder
    actors?: SortOrder
    genres?: SortOrder
    synopsis?: SortOrder
    production?: SortOrder
    country?: SortOrder
    language?: SortOrder
    voteAverage?: SortOrder
    voteCount?: SortOrder
    popularity?: SortOrder
    budget?: SortOrder
    keywords?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    image1?: SortOrder
    image2?: SortOrder
    image3?: SortOrder
    image4?: SortOrder
    image5?: SortOrder
    image6?: SortOrder
    image7?: SortOrder
    image8?: SortOrder
    image9?: SortOrder
    image10?: SortOrder
    createdAt?: SortOrder
  }

  export type DataMovieAvgOrderByAggregateInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    year?: SortOrder
    runtime?: SortOrder
    voteAverage?: SortOrder
    voteCount?: SortOrder
    popularity?: SortOrder
    budget?: SortOrder
  }

  export type DataMovieMaxOrderByAggregateInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    title?: SortOrder
    originalTitle?: SortOrder
    year?: SortOrder
    releaseDate?: SortOrder
    runtime?: SortOrder
    director?: SortOrder
    actors?: SortOrder
    genres?: SortOrder
    synopsis?: SortOrder
    production?: SortOrder
    country?: SortOrder
    language?: SortOrder
    voteAverage?: SortOrder
    voteCount?: SortOrder
    popularity?: SortOrder
    budget?: SortOrder
    keywords?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    image1?: SortOrder
    image2?: SortOrder
    image3?: SortOrder
    image4?: SortOrder
    image5?: SortOrder
    image6?: SortOrder
    image7?: SortOrder
    image8?: SortOrder
    image9?: SortOrder
    image10?: SortOrder
    createdAt?: SortOrder
  }

  export type DataMovieMinOrderByAggregateInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    title?: SortOrder
    originalTitle?: SortOrder
    year?: SortOrder
    releaseDate?: SortOrder
    runtime?: SortOrder
    director?: SortOrder
    actors?: SortOrder
    genres?: SortOrder
    synopsis?: SortOrder
    production?: SortOrder
    country?: SortOrder
    language?: SortOrder
    voteAverage?: SortOrder
    voteCount?: SortOrder
    popularity?: SortOrder
    budget?: SortOrder
    keywords?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    image1?: SortOrder
    image2?: SortOrder
    image3?: SortOrder
    image4?: SortOrder
    image5?: SortOrder
    image6?: SortOrder
    image7?: SortOrder
    image8?: SortOrder
    image9?: SortOrder
    image10?: SortOrder
    createdAt?: SortOrder
  }

  export type DataMovieSumOrderByAggregateInput = {
    id?: SortOrder
    tmdbId?: SortOrder
    year?: SortOrder
    runtime?: SortOrder
    voteAverage?: SortOrder
    voteCount?: SortOrder
    popularity?: SortOrder
    budget?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DataMovieScalarRelationFilter = {
    is?: DataMovieWhereInput
    isNot?: DataMovieWhereInput
  }

  export type GameCinema1TriesListRelationFilter = {
    every?: GameCinema1TriesWhereInput
    some?: GameCinema1TriesWhereInput
    none?: GameCinema1TriesWhereInput
  }

  export type GameCinema1TriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCinema1DaysCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    movieId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1DaysAvgOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
  }

  export type GameCinema1DaysMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    movieId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1DaysMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    movieId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1DaysSumOrderByAggregateInput = {
    id?: SortOrder
    movieId?: SortOrder
  }

  export type GameCinema1DaysScalarRelationFilter = {
    is?: GameCinema1DaysWhereInput
    isNot?: GameCinema1DaysWhereInput
  }

  export type GameCinema1TriesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
    guess?: SortOrder
    correct?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1TriesAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
  }

  export type GameCinema1TriesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
    guess?: SortOrder
    correct?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1TriesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
    guess?: SortOrder
    correct?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCinema1TriesSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayId?: SortOrder
  }

  export type AvatarCreateNestedOneWithoutUserInput = {
    create?: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUserInput
    connect?: AvatarWhereUniqueInput
  }

  export type FriendCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type UserStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserEventCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type GameResultCreateNestedManyWithoutUserInput = {
    create?: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput> | GameResultCreateWithoutUserInput[] | GameResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutUserInput | GameResultCreateOrConnectWithoutUserInput[]
    createMany?: GameResultCreateManyUserInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUserInput
    connect?: AvatarWhereUniqueInput
  }

  export type FriendUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type UserStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type GameResultUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput> | GameResultCreateWithoutUserInput[] | GameResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutUserInput | GameResultCreateOrConnectWithoutUserInput[]
    createMany?: GameResultCreateManyUserInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AvatarUpdateOneWithoutUserNestedInput = {
    create?: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUserInput
    upsert?: AvatarUpsertWithoutUserInput
    disconnect?: AvatarWhereInput | boolean
    delete?: AvatarWhereInput | boolean
    connect?: AvatarWhereUniqueInput
    update?: XOR<XOR<AvatarUpdateToOneWithWhereWithoutUserInput, AvatarUpdateWithoutUserInput>, AvatarUncheckedUpdateWithoutUserInput>
  }

  export type FriendUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type UserStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutUserInput | UserEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutUserInput | UserEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutUserInput | UserEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type GameResultUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput> | GameResultCreateWithoutUserInput[] | GameResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutUserInput | GameResultCreateOrConnectWithoutUserInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutUserInput | GameResultUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameResultCreateManyUserInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutUserInput | GameResultUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutUserInput | GameResultUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AvatarUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUserInput
    upsert?: AvatarUpsertWithoutUserInput
    disconnect?: AvatarWhereInput | boolean
    delete?: AvatarWhereInput | boolean
    connect?: AvatarWhereUniqueInput
    update?: XOR<XOR<AvatarUpdateToOneWithWhereWithoutUserInput, AvatarUpdateWithoutUserInput>, AvatarUncheckedUpdateWithoutUserInput>
  }

  export type FriendUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type UserStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutUserInput | UserEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutUserInput | UserEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutUserInput | UserEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type GameResultUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput> | GameResultCreateWithoutUserInput[] | GameResultUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutUserInput | GameResultCreateOrConnectWithoutUserInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutUserInput | GameResultUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameResultCreateManyUserInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutUserInput | GameResultUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutUserInput | GameResultUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type AvatarAssetCreateNestedOneWithoutShapesInput = {
    create?: XOR<AvatarAssetCreateWithoutShapesInput, AvatarAssetUncheckedCreateWithoutShapesInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutShapesInput
    connect?: AvatarAssetWhereUniqueInput
  }

  export type AvatarAssetCreateNestedOneWithoutEyesInput = {
    create?: XOR<AvatarAssetCreateWithoutEyesInput, AvatarAssetUncheckedCreateWithoutEyesInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutEyesInput
    connect?: AvatarAssetWhereUniqueInput
  }

  export type AvatarAssetCreateNestedOneWithoutMouthsInput = {
    create?: XOR<AvatarAssetCreateWithoutMouthsInput, AvatarAssetUncheckedCreateWithoutMouthsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutMouthsInput
    connect?: AvatarAssetWhereUniqueInput
  }

  export type AvatarAssetCreateNestedOneWithoutPatternsInput = {
    create?: XOR<AvatarAssetCreateWithoutPatternsInput, AvatarAssetUncheckedCreateWithoutPatternsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutPatternsInput
    connect?: AvatarAssetWhereUniqueInput
  }

  export type ColorCreateNestedOneWithoutColorShapeInput = {
    create?: XOR<ColorCreateWithoutColorShapeInput, ColorUncheckedCreateWithoutColorShapeInput>
    connectOrCreate?: ColorCreateOrConnectWithoutColorShapeInput
    connect?: ColorWhereUniqueInput
  }

  export type ColorCreateNestedOneWithoutColorPatternInput = {
    create?: XOR<ColorCreateWithoutColorPatternInput, ColorUncheckedCreateWithoutColorPatternInput>
    connectOrCreate?: ColorCreateOrConnectWithoutColorPatternInput
    connect?: ColorWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAvatarInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput
    connect?: UserWhereUniqueInput
  }

  export type AvatarAssetUpdateOneRequiredWithoutShapesNestedInput = {
    create?: XOR<AvatarAssetCreateWithoutShapesInput, AvatarAssetUncheckedCreateWithoutShapesInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutShapesInput
    upsert?: AvatarAssetUpsertWithoutShapesInput
    connect?: AvatarAssetWhereUniqueInput
    update?: XOR<XOR<AvatarAssetUpdateToOneWithWhereWithoutShapesInput, AvatarAssetUpdateWithoutShapesInput>, AvatarAssetUncheckedUpdateWithoutShapesInput>
  }

  export type AvatarAssetUpdateOneRequiredWithoutEyesNestedInput = {
    create?: XOR<AvatarAssetCreateWithoutEyesInput, AvatarAssetUncheckedCreateWithoutEyesInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutEyesInput
    upsert?: AvatarAssetUpsertWithoutEyesInput
    connect?: AvatarAssetWhereUniqueInput
    update?: XOR<XOR<AvatarAssetUpdateToOneWithWhereWithoutEyesInput, AvatarAssetUpdateWithoutEyesInput>, AvatarAssetUncheckedUpdateWithoutEyesInput>
  }

  export type AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput = {
    create?: XOR<AvatarAssetCreateWithoutMouthsInput, AvatarAssetUncheckedCreateWithoutMouthsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutMouthsInput
    upsert?: AvatarAssetUpsertWithoutMouthsInput
    connect?: AvatarAssetWhereUniqueInput
    update?: XOR<XOR<AvatarAssetUpdateToOneWithWhereWithoutMouthsInput, AvatarAssetUpdateWithoutMouthsInput>, AvatarAssetUncheckedUpdateWithoutMouthsInput>
  }

  export type AvatarAssetUpdateOneWithoutPatternsNestedInput = {
    create?: XOR<AvatarAssetCreateWithoutPatternsInput, AvatarAssetUncheckedCreateWithoutPatternsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutPatternsInput
    upsert?: AvatarAssetUpsertWithoutPatternsInput
    disconnect?: AvatarAssetWhereInput | boolean
    delete?: AvatarAssetWhereInput | boolean
    connect?: AvatarAssetWhereUniqueInput
    update?: XOR<XOR<AvatarAssetUpdateToOneWithWhereWithoutPatternsInput, AvatarAssetUpdateWithoutPatternsInput>, AvatarAssetUncheckedUpdateWithoutPatternsInput>
  }

  export type ColorUpdateOneRequiredWithoutColorShapeNestedInput = {
    create?: XOR<ColorCreateWithoutColorShapeInput, ColorUncheckedCreateWithoutColorShapeInput>
    connectOrCreate?: ColorCreateOrConnectWithoutColorShapeInput
    upsert?: ColorUpsertWithoutColorShapeInput
    connect?: ColorWhereUniqueInput
    update?: XOR<XOR<ColorUpdateToOneWithWhereWithoutColorShapeInput, ColorUpdateWithoutColorShapeInput>, ColorUncheckedUpdateWithoutColorShapeInput>
  }

  export type ColorUpdateOneWithoutColorPatternNestedInput = {
    create?: XOR<ColorCreateWithoutColorPatternInput, ColorUncheckedCreateWithoutColorPatternInput>
    connectOrCreate?: ColorCreateOrConnectWithoutColorPatternInput
    upsert?: ColorUpsertWithoutColorPatternInput
    disconnect?: ColorWhereInput | boolean
    delete?: ColorWhereInput | boolean
    connect?: ColorWhereUniqueInput
    update?: XOR<XOR<ColorUpdateToOneWithWhereWithoutColorPatternInput, ColorUpdateWithoutColorPatternInput>, ColorUncheckedUpdateWithoutColorPatternInput>
  }

  export type UserUpdateOneRequiredWithoutAvatarNestedInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput
    upsert?: UserUpsertWithoutAvatarInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAvatarInput, UserUpdateWithoutAvatarInput>, UserUncheckedUpdateWithoutAvatarInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AvatarCreateNestedManyWithoutColorShapeInput = {
    create?: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput> | AvatarCreateWithoutColorShapeInput[] | AvatarUncheckedCreateWithoutColorShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorShapeInput | AvatarCreateOrConnectWithoutColorShapeInput[]
    createMany?: AvatarCreateManyColorShapeInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarCreateNestedManyWithoutColorPatternInput = {
    create?: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput> | AvatarCreateWithoutColorPatternInput[] | AvatarUncheckedCreateWithoutColorPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorPatternInput | AvatarCreateOrConnectWithoutColorPatternInput[]
    createMany?: AvatarCreateManyColorPatternInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutColorShapeInput = {
    create?: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput> | AvatarCreateWithoutColorShapeInput[] | AvatarUncheckedCreateWithoutColorShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorShapeInput | AvatarCreateOrConnectWithoutColorShapeInput[]
    createMany?: AvatarCreateManyColorShapeInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutColorPatternInput = {
    create?: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput> | AvatarCreateWithoutColorPatternInput[] | AvatarUncheckedCreateWithoutColorPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorPatternInput | AvatarCreateOrConnectWithoutColorPatternInput[]
    createMany?: AvatarCreateManyColorPatternInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUpdateManyWithoutColorShapeNestedInput = {
    create?: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput> | AvatarCreateWithoutColorShapeInput[] | AvatarUncheckedCreateWithoutColorShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorShapeInput | AvatarCreateOrConnectWithoutColorShapeInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutColorShapeInput | AvatarUpsertWithWhereUniqueWithoutColorShapeInput[]
    createMany?: AvatarCreateManyColorShapeInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutColorShapeInput | AvatarUpdateWithWhereUniqueWithoutColorShapeInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutColorShapeInput | AvatarUpdateManyWithWhereWithoutColorShapeInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUpdateManyWithoutColorPatternNestedInput = {
    create?: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput> | AvatarCreateWithoutColorPatternInput[] | AvatarUncheckedCreateWithoutColorPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorPatternInput | AvatarCreateOrConnectWithoutColorPatternInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutColorPatternInput | AvatarUpsertWithWhereUniqueWithoutColorPatternInput[]
    createMany?: AvatarCreateManyColorPatternInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutColorPatternInput | AvatarUpdateWithWhereUniqueWithoutColorPatternInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutColorPatternInput | AvatarUpdateManyWithWhereWithoutColorPatternInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutColorShapeNestedInput = {
    create?: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput> | AvatarCreateWithoutColorShapeInput[] | AvatarUncheckedCreateWithoutColorShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorShapeInput | AvatarCreateOrConnectWithoutColorShapeInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutColorShapeInput | AvatarUpsertWithWhereUniqueWithoutColorShapeInput[]
    createMany?: AvatarCreateManyColorShapeInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutColorShapeInput | AvatarUpdateWithWhereUniqueWithoutColorShapeInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutColorShapeInput | AvatarUpdateManyWithWhereWithoutColorShapeInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutColorPatternNestedInput = {
    create?: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput> | AvatarCreateWithoutColorPatternInput[] | AvatarUncheckedCreateWithoutColorPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutColorPatternInput | AvatarCreateOrConnectWithoutColorPatternInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutColorPatternInput | AvatarUpsertWithWhereUniqueWithoutColorPatternInput[]
    createMany?: AvatarCreateManyColorPatternInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutColorPatternInput | AvatarUpdateWithWhereUniqueWithoutColorPatternInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutColorPatternInput | AvatarUpdateManyWithWhereWithoutColorPatternInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarCreateNestedManyWithoutShapeInput = {
    create?: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput> | AvatarCreateWithoutShapeInput[] | AvatarUncheckedCreateWithoutShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutShapeInput | AvatarCreateOrConnectWithoutShapeInput[]
    createMany?: AvatarCreateManyShapeInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarCreateNestedManyWithoutEyesInput = {
    create?: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput> | AvatarCreateWithoutEyesInput[] | AvatarUncheckedCreateWithoutEyesInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutEyesInput | AvatarCreateOrConnectWithoutEyesInput[]
    createMany?: AvatarCreateManyEyesInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarCreateNestedManyWithoutMouthInput = {
    create?: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput> | AvatarCreateWithoutMouthInput[] | AvatarUncheckedCreateWithoutMouthInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutMouthInput | AvatarCreateOrConnectWithoutMouthInput[]
    createMany?: AvatarCreateManyMouthInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarCreateNestedManyWithoutPatternInput = {
    create?: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput> | AvatarCreateWithoutPatternInput[] | AvatarUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutPatternInput | AvatarCreateOrConnectWithoutPatternInput[]
    createMany?: AvatarCreateManyPatternInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type UserEventCreateNestedManyWithoutAvatarAssetInput = {
    create?: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput> | UserEventCreateWithoutAvatarAssetInput[] | UserEventUncheckedCreateWithoutAvatarAssetInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutAvatarAssetInput | UserEventCreateOrConnectWithoutAvatarAssetInput[]
    createMany?: UserEventCreateManyAvatarAssetInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutShapeInput = {
    create?: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput> | AvatarCreateWithoutShapeInput[] | AvatarUncheckedCreateWithoutShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutShapeInput | AvatarCreateOrConnectWithoutShapeInput[]
    createMany?: AvatarCreateManyShapeInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutEyesInput = {
    create?: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput> | AvatarCreateWithoutEyesInput[] | AvatarUncheckedCreateWithoutEyesInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutEyesInput | AvatarCreateOrConnectWithoutEyesInput[]
    createMany?: AvatarCreateManyEyesInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutMouthInput = {
    create?: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput> | AvatarCreateWithoutMouthInput[] | AvatarUncheckedCreateWithoutMouthInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutMouthInput | AvatarCreateOrConnectWithoutMouthInput[]
    createMany?: AvatarCreateManyMouthInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type AvatarUncheckedCreateNestedManyWithoutPatternInput = {
    create?: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput> | AvatarCreateWithoutPatternInput[] | AvatarUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutPatternInput | AvatarCreateOrConnectWithoutPatternInput[]
    createMany?: AvatarCreateManyPatternInputEnvelope
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
  }

  export type UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput = {
    create?: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput> | UserEventCreateWithoutAvatarAssetInput[] | UserEventUncheckedCreateWithoutAvatarAssetInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutAvatarAssetInput | UserEventCreateOrConnectWithoutAvatarAssetInput[]
    createMany?: UserEventCreateManyAvatarAssetInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type AvatarUpdateManyWithoutShapeNestedInput = {
    create?: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput> | AvatarCreateWithoutShapeInput[] | AvatarUncheckedCreateWithoutShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutShapeInput | AvatarCreateOrConnectWithoutShapeInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutShapeInput | AvatarUpsertWithWhereUniqueWithoutShapeInput[]
    createMany?: AvatarCreateManyShapeInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutShapeInput | AvatarUpdateWithWhereUniqueWithoutShapeInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutShapeInput | AvatarUpdateManyWithWhereWithoutShapeInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUpdateManyWithoutEyesNestedInput = {
    create?: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput> | AvatarCreateWithoutEyesInput[] | AvatarUncheckedCreateWithoutEyesInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutEyesInput | AvatarCreateOrConnectWithoutEyesInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutEyesInput | AvatarUpsertWithWhereUniqueWithoutEyesInput[]
    createMany?: AvatarCreateManyEyesInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutEyesInput | AvatarUpdateWithWhereUniqueWithoutEyesInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutEyesInput | AvatarUpdateManyWithWhereWithoutEyesInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUpdateManyWithoutMouthNestedInput = {
    create?: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput> | AvatarCreateWithoutMouthInput[] | AvatarUncheckedCreateWithoutMouthInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutMouthInput | AvatarCreateOrConnectWithoutMouthInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutMouthInput | AvatarUpsertWithWhereUniqueWithoutMouthInput[]
    createMany?: AvatarCreateManyMouthInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutMouthInput | AvatarUpdateWithWhereUniqueWithoutMouthInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutMouthInput | AvatarUpdateManyWithWhereWithoutMouthInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUpdateManyWithoutPatternNestedInput = {
    create?: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput> | AvatarCreateWithoutPatternInput[] | AvatarUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutPatternInput | AvatarCreateOrConnectWithoutPatternInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutPatternInput | AvatarUpsertWithWhereUniqueWithoutPatternInput[]
    createMany?: AvatarCreateManyPatternInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutPatternInput | AvatarUpdateWithWhereUniqueWithoutPatternInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutPatternInput | AvatarUpdateManyWithWhereWithoutPatternInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type UserEventUpdateManyWithoutAvatarAssetNestedInput = {
    create?: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput> | UserEventCreateWithoutAvatarAssetInput[] | UserEventUncheckedCreateWithoutAvatarAssetInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutAvatarAssetInput | UserEventCreateOrConnectWithoutAvatarAssetInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutAvatarAssetInput | UserEventUpsertWithWhereUniqueWithoutAvatarAssetInput[]
    createMany?: UserEventCreateManyAvatarAssetInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutAvatarAssetInput | UserEventUpdateWithWhereUniqueWithoutAvatarAssetInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutAvatarAssetInput | UserEventUpdateManyWithWhereWithoutAvatarAssetInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutShapeNestedInput = {
    create?: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput> | AvatarCreateWithoutShapeInput[] | AvatarUncheckedCreateWithoutShapeInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutShapeInput | AvatarCreateOrConnectWithoutShapeInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutShapeInput | AvatarUpsertWithWhereUniqueWithoutShapeInput[]
    createMany?: AvatarCreateManyShapeInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutShapeInput | AvatarUpdateWithWhereUniqueWithoutShapeInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutShapeInput | AvatarUpdateManyWithWhereWithoutShapeInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutEyesNestedInput = {
    create?: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput> | AvatarCreateWithoutEyesInput[] | AvatarUncheckedCreateWithoutEyesInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutEyesInput | AvatarCreateOrConnectWithoutEyesInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutEyesInput | AvatarUpsertWithWhereUniqueWithoutEyesInput[]
    createMany?: AvatarCreateManyEyesInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutEyesInput | AvatarUpdateWithWhereUniqueWithoutEyesInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutEyesInput | AvatarUpdateManyWithWhereWithoutEyesInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutMouthNestedInput = {
    create?: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput> | AvatarCreateWithoutMouthInput[] | AvatarUncheckedCreateWithoutMouthInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutMouthInput | AvatarCreateOrConnectWithoutMouthInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutMouthInput | AvatarUpsertWithWhereUniqueWithoutMouthInput[]
    createMany?: AvatarCreateManyMouthInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutMouthInput | AvatarUpdateWithWhereUniqueWithoutMouthInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutMouthInput | AvatarUpdateManyWithWhereWithoutMouthInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type AvatarUncheckedUpdateManyWithoutPatternNestedInput = {
    create?: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput> | AvatarCreateWithoutPatternInput[] | AvatarUncheckedCreateWithoutPatternInput[]
    connectOrCreate?: AvatarCreateOrConnectWithoutPatternInput | AvatarCreateOrConnectWithoutPatternInput[]
    upsert?: AvatarUpsertWithWhereUniqueWithoutPatternInput | AvatarUpsertWithWhereUniqueWithoutPatternInput[]
    createMany?: AvatarCreateManyPatternInputEnvelope
    set?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    disconnect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    delete?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    connect?: AvatarWhereUniqueInput | AvatarWhereUniqueInput[]
    update?: AvatarUpdateWithWhereUniqueWithoutPatternInput | AvatarUpdateWithWhereUniqueWithoutPatternInput[]
    updateMany?: AvatarUpdateManyWithWhereWithoutPatternInput | AvatarUpdateManyWithWhereWithoutPatternInput[]
    deleteMany?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
  }

  export type UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput = {
    create?: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput> | UserEventCreateWithoutAvatarAssetInput[] | UserEventUncheckedCreateWithoutAvatarAssetInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutAvatarAssetInput | UserEventCreateOrConnectWithoutAvatarAssetInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutAvatarAssetInput | UserEventUpsertWithWhereUniqueWithoutAvatarAssetInput[]
    createMany?: UserEventCreateManyAvatarAssetInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutAvatarAssetInput | UserEventUpdateWithWhereUniqueWithoutAvatarAssetInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutAvatarAssetInput | UserEventUpdateManyWithWhereWithoutAvatarAssetInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFriendsInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendInput = {
    create?: XOR<UserCreateWithoutFriendInput, UserUncheckedCreateWithoutFriendInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendInput
    connect?: UserWhereUniqueInput
  }

  export type UserEventCreateNestedManyWithoutFriendInput = {
    create?: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput> | UserEventCreateWithoutFriendInput[] | UserEventUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutFriendInput | UserEventCreateOrConnectWithoutFriendInput[]
    createMany?: UserEventCreateManyFriendInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserEventUncheckedCreateNestedManyWithoutFriendInput = {
    create?: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput> | UserEventCreateWithoutFriendInput[] | UserEventUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutFriendInput | UserEventCreateOrConnectWithoutFriendInput[]
    createMany?: UserEventCreateManyFriendInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFriendsNestedInput = {
    create?: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsInput
    upsert?: UserUpsertWithoutFriendsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendsInput, UserUpdateWithoutFriendsInput>, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateOneRequiredWithoutFriendNestedInput = {
    create?: XOR<UserCreateWithoutFriendInput, UserUncheckedCreateWithoutFriendInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendInput
    upsert?: UserUpsertWithoutFriendInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendInput, UserUpdateWithoutFriendInput>, UserUncheckedUpdateWithoutFriendInput>
  }

  export type UserEventUpdateManyWithoutFriendNestedInput = {
    create?: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput> | UserEventCreateWithoutFriendInput[] | UserEventUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutFriendInput | UserEventCreateOrConnectWithoutFriendInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutFriendInput | UserEventUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: UserEventCreateManyFriendInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutFriendInput | UserEventUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutFriendInput | UserEventUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserEventUncheckedUpdateManyWithoutFriendNestedInput = {
    create?: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput> | UserEventCreateWithoutFriendInput[] | UserEventUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutFriendInput | UserEventCreateOrConnectWithoutFriendInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutFriendInput | UserEventUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: UserEventCreateManyFriendInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutFriendInput | UserEventUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutFriendInput | UserEventUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserStatsInput = {
    create?: XOR<UserCreateWithoutUserStatsInput, UserUncheckedCreateWithoutUserStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserStatsNestedInput = {
    create?: XOR<UserCreateWithoutUserStatsInput, UserUncheckedCreateWithoutUserStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserStatsInput
    upsert?: UserUpsertWithoutUserStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserStatsInput, UserUpdateWithoutUserStatsInput>, UserUncheckedUpdateWithoutUserStatsInput>
  }

  export type AvatarAssetCreateNestedOneWithoutUserEventsInput = {
    create?: XOR<AvatarAssetCreateWithoutUserEventsInput, AvatarAssetUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutUserEventsInput
    connect?: AvatarAssetWhereUniqueInput
  }

  export type FriendCreateNestedOneWithoutUserEventsInput = {
    create?: XOR<FriendCreateWithoutUserEventsInput, FriendUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: FriendCreateOrConnectWithoutUserEventsInput
    connect?: FriendWhereUniqueInput
  }

  export type GameResultCreateNestedOneWithoutUserEventsInput = {
    create?: XOR<GameResultCreateWithoutUserEventsInput, GameResultUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: GameResultCreateOrConnectWithoutUserEventsInput
    connect?: GameResultWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserEventsInput = {
    create?: XOR<UserCreateWithoutUserEventsInput, UserUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserEventsInput
    connect?: UserWhereUniqueInput
  }

  export type AvatarAssetUpdateOneWithoutUserEventsNestedInput = {
    create?: XOR<AvatarAssetCreateWithoutUserEventsInput, AvatarAssetUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: AvatarAssetCreateOrConnectWithoutUserEventsInput
    upsert?: AvatarAssetUpsertWithoutUserEventsInput
    disconnect?: AvatarAssetWhereInput | boolean
    delete?: AvatarAssetWhereInput | boolean
    connect?: AvatarAssetWhereUniqueInput
    update?: XOR<XOR<AvatarAssetUpdateToOneWithWhereWithoutUserEventsInput, AvatarAssetUpdateWithoutUserEventsInput>, AvatarAssetUncheckedUpdateWithoutUserEventsInput>
  }

  export type FriendUpdateOneWithoutUserEventsNestedInput = {
    create?: XOR<FriendCreateWithoutUserEventsInput, FriendUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: FriendCreateOrConnectWithoutUserEventsInput
    upsert?: FriendUpsertWithoutUserEventsInput
    disconnect?: FriendWhereInput | boolean
    delete?: FriendWhereInput | boolean
    connect?: FriendWhereUniqueInput
    update?: XOR<XOR<FriendUpdateToOneWithWhereWithoutUserEventsInput, FriendUpdateWithoutUserEventsInput>, FriendUncheckedUpdateWithoutUserEventsInput>
  }

  export type GameResultUpdateOneWithoutUserEventsNestedInput = {
    create?: XOR<GameResultCreateWithoutUserEventsInput, GameResultUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: GameResultCreateOrConnectWithoutUserEventsInput
    upsert?: GameResultUpsertWithoutUserEventsInput
    disconnect?: GameResultWhereInput | boolean
    delete?: GameResultWhereInput | boolean
    connect?: GameResultWhereUniqueInput
    update?: XOR<XOR<GameResultUpdateToOneWithWhereWithoutUserEventsInput, GameResultUpdateWithoutUserEventsInput>, GameResultUncheckedUpdateWithoutUserEventsInput>
  }

  export type UserUpdateOneRequiredWithoutUserEventsNestedInput = {
    create?: XOR<UserCreateWithoutUserEventsInput, UserUncheckedCreateWithoutUserEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserEventsInput
    upsert?: UserUpsertWithoutUserEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserEventsInput, UserUpdateWithoutUserEventsInput>, UserUncheckedUpdateWithoutUserEventsInput>
  }

  export type UserCreateNestedOneWithoutGameResultsInput = {
    create?: XOR<UserCreateWithoutGameResultsInput, UserUncheckedCreateWithoutGameResultsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameResultsInput
    connect?: UserWhereUniqueInput
  }

  export type GameCreateNestedOneWithoutResultsInput = {
    create?: XOR<GameCreateWithoutResultsInput, GameUncheckedCreateWithoutResultsInput>
    connectOrCreate?: GameCreateOrConnectWithoutResultsInput
    connect?: GameWhereUniqueInput
  }

  export type UserEventCreateNestedManyWithoutGameResultInput = {
    create?: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput> | UserEventCreateWithoutGameResultInput[] | UserEventUncheckedCreateWithoutGameResultInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutGameResultInput | UserEventCreateOrConnectWithoutGameResultInput[]
    createMany?: UserEventCreateManyGameResultInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserEventUncheckedCreateNestedManyWithoutGameResultInput = {
    create?: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput> | UserEventCreateWithoutGameResultInput[] | UserEventUncheckedCreateWithoutGameResultInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutGameResultInput | UserEventCreateOrConnectWithoutGameResultInput[]
    createMany?: UserEventCreateManyGameResultInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutGameResultsNestedInput = {
    create?: XOR<UserCreateWithoutGameResultsInput, UserUncheckedCreateWithoutGameResultsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameResultsInput
    upsert?: UserUpsertWithoutGameResultsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameResultsInput, UserUpdateWithoutGameResultsInput>, UserUncheckedUpdateWithoutGameResultsInput>
  }

  export type GameUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<GameCreateWithoutResultsInput, GameUncheckedCreateWithoutResultsInput>
    connectOrCreate?: GameCreateOrConnectWithoutResultsInput
    upsert?: GameUpsertWithoutResultsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutResultsInput, GameUpdateWithoutResultsInput>, GameUncheckedUpdateWithoutResultsInput>
  }

  export type UserEventUpdateManyWithoutGameResultNestedInput = {
    create?: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput> | UserEventCreateWithoutGameResultInput[] | UserEventUncheckedCreateWithoutGameResultInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutGameResultInput | UserEventCreateOrConnectWithoutGameResultInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutGameResultInput | UserEventUpsertWithWhereUniqueWithoutGameResultInput[]
    createMany?: UserEventCreateManyGameResultInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutGameResultInput | UserEventUpdateWithWhereUniqueWithoutGameResultInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutGameResultInput | UserEventUpdateManyWithWhereWithoutGameResultInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserEventUncheckedUpdateManyWithoutGameResultNestedInput = {
    create?: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput> | UserEventCreateWithoutGameResultInput[] | UserEventUncheckedCreateWithoutGameResultInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutGameResultInput | UserEventCreateOrConnectWithoutGameResultInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutGameResultInput | UserEventUpsertWithWhereUniqueWithoutGameResultInput[]
    createMany?: UserEventCreateManyGameResultInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutGameResultInput | UserEventUpdateWithWhereUniqueWithoutGameResultInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutGameResultInput | UserEventUpdateManyWithWhereWithoutGameResultInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type GameCategoryCreateNestedOneWithoutGamesInput = {
    create?: XOR<GameCategoryCreateWithoutGamesInput, GameCategoryUncheckedCreateWithoutGamesInput>
    connectOrCreate?: GameCategoryCreateOrConnectWithoutGamesInput
    connect?: GameCategoryWhereUniqueInput
  }

  export type GameResultCreateNestedManyWithoutGameInput = {
    create?: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput> | GameResultCreateWithoutGameInput[] | GameResultUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutGameInput | GameResultCreateOrConnectWithoutGameInput[]
    createMany?: GameResultCreateManyGameInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type GameResultUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput> | GameResultCreateWithoutGameInput[] | GameResultUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutGameInput | GameResultCreateOrConnectWithoutGameInput[]
    createMany?: GameResultCreateManyGameInputEnvelope
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
  }

  export type GameCategoryUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<GameCategoryCreateWithoutGamesInput, GameCategoryUncheckedCreateWithoutGamesInput>
    connectOrCreate?: GameCategoryCreateOrConnectWithoutGamesInput
    upsert?: GameCategoryUpsertWithoutGamesInput
    connect?: GameCategoryWhereUniqueInput
    update?: XOR<XOR<GameCategoryUpdateToOneWithWhereWithoutGamesInput, GameCategoryUpdateWithoutGamesInput>, GameCategoryUncheckedUpdateWithoutGamesInput>
  }

  export type GameResultUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput> | GameResultCreateWithoutGameInput[] | GameResultUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutGameInput | GameResultCreateOrConnectWithoutGameInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutGameInput | GameResultUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameResultCreateManyGameInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutGameInput | GameResultUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutGameInput | GameResultUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type GameResultUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput> | GameResultCreateWithoutGameInput[] | GameResultUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameResultCreateOrConnectWithoutGameInput | GameResultCreateOrConnectWithoutGameInput[]
    upsert?: GameResultUpsertWithWhereUniqueWithoutGameInput | GameResultUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameResultCreateManyGameInputEnvelope
    set?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    disconnect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    delete?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    connect?: GameResultWhereUniqueInput | GameResultWhereUniqueInput[]
    update?: GameResultUpdateWithWhereUniqueWithoutGameInput | GameResultUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameResultUpdateManyWithWhereWithoutGameInput | GameResultUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
  }

  export type GameCreateNestedManyWithoutGameCategoryInput = {
    create?: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput> | GameCreateWithoutGameCategoryInput[] | GameUncheckedCreateWithoutGameCategoryInput[]
    connectOrCreate?: GameCreateOrConnectWithoutGameCategoryInput | GameCreateOrConnectWithoutGameCategoryInput[]
    createMany?: GameCreateManyGameCategoryInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutGameCategoryInput = {
    create?: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput> | GameCreateWithoutGameCategoryInput[] | GameUncheckedCreateWithoutGameCategoryInput[]
    connectOrCreate?: GameCreateOrConnectWithoutGameCategoryInput | GameCreateOrConnectWithoutGameCategoryInput[]
    createMany?: GameCreateManyGameCategoryInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUpdateManyWithoutGameCategoryNestedInput = {
    create?: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput> | GameCreateWithoutGameCategoryInput[] | GameUncheckedCreateWithoutGameCategoryInput[]
    connectOrCreate?: GameCreateOrConnectWithoutGameCategoryInput | GameCreateOrConnectWithoutGameCategoryInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutGameCategoryInput | GameUpsertWithWhereUniqueWithoutGameCategoryInput[]
    createMany?: GameCreateManyGameCategoryInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutGameCategoryInput | GameUpdateWithWhereUniqueWithoutGameCategoryInput[]
    updateMany?: GameUpdateManyWithWhereWithoutGameCategoryInput | GameUpdateManyWithWhereWithoutGameCategoryInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutGameCategoryNestedInput = {
    create?: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput> | GameCreateWithoutGameCategoryInput[] | GameUncheckedCreateWithoutGameCategoryInput[]
    connectOrCreate?: GameCreateOrConnectWithoutGameCategoryInput | GameCreateOrConnectWithoutGameCategoryInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutGameCategoryInput | GameUpsertWithWhereUniqueWithoutGameCategoryInput[]
    createMany?: GameCreateManyGameCategoryInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutGameCategoryInput | GameUpdateWithWhereUniqueWithoutGameCategoryInput[]
    updateMany?: GameUpdateManyWithWhereWithoutGameCategoryInput | GameUpdateManyWithWhereWithoutGameCategoryInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameCinema1DaysCreateNestedManyWithoutMovieInput = {
    create?: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput> | GameCinema1DaysCreateWithoutMovieInput[] | GameCinema1DaysUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutMovieInput | GameCinema1DaysCreateOrConnectWithoutMovieInput[]
    createMany?: GameCinema1DaysCreateManyMovieInputEnvelope
    connect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
  }

  export type GameCinema1DaysUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput> | GameCinema1DaysCreateWithoutMovieInput[] | GameCinema1DaysUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutMovieInput | GameCinema1DaysCreateOrConnectWithoutMovieInput[]
    createMany?: GameCinema1DaysCreateManyMovieInputEnvelope
    connect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameCinema1DaysUpdateManyWithoutMovieNestedInput = {
    create?: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput> | GameCinema1DaysCreateWithoutMovieInput[] | GameCinema1DaysUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutMovieInput | GameCinema1DaysCreateOrConnectWithoutMovieInput[]
    upsert?: GameCinema1DaysUpsertWithWhereUniqueWithoutMovieInput | GameCinema1DaysUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: GameCinema1DaysCreateManyMovieInputEnvelope
    set?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    disconnect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    delete?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    connect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    update?: GameCinema1DaysUpdateWithWhereUniqueWithoutMovieInput | GameCinema1DaysUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: GameCinema1DaysUpdateManyWithWhereWithoutMovieInput | GameCinema1DaysUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: GameCinema1DaysScalarWhereInput | GameCinema1DaysScalarWhereInput[]
  }

  export type GameCinema1DaysUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput> | GameCinema1DaysCreateWithoutMovieInput[] | GameCinema1DaysUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutMovieInput | GameCinema1DaysCreateOrConnectWithoutMovieInput[]
    upsert?: GameCinema1DaysUpsertWithWhereUniqueWithoutMovieInput | GameCinema1DaysUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: GameCinema1DaysCreateManyMovieInputEnvelope
    set?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    disconnect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    delete?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    connect?: GameCinema1DaysWhereUniqueInput | GameCinema1DaysWhereUniqueInput[]
    update?: GameCinema1DaysUpdateWithWhereUniqueWithoutMovieInput | GameCinema1DaysUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: GameCinema1DaysUpdateManyWithWhereWithoutMovieInput | GameCinema1DaysUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: GameCinema1DaysScalarWhereInput | GameCinema1DaysScalarWhereInput[]
  }

  export type DataMovieCreateNestedOneWithoutGameDaysInput = {
    create?: XOR<DataMovieCreateWithoutGameDaysInput, DataMovieUncheckedCreateWithoutGameDaysInput>
    connectOrCreate?: DataMovieCreateOrConnectWithoutGameDaysInput
    connect?: DataMovieWhereUniqueInput
  }

  export type GameCinema1TriesCreateNestedManyWithoutDayInput = {
    create?: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput> | GameCinema1TriesCreateWithoutDayInput[] | GameCinema1TriesUncheckedCreateWithoutDayInput[]
    connectOrCreate?: GameCinema1TriesCreateOrConnectWithoutDayInput | GameCinema1TriesCreateOrConnectWithoutDayInput[]
    createMany?: GameCinema1TriesCreateManyDayInputEnvelope
    connect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
  }

  export type GameCinema1TriesUncheckedCreateNestedManyWithoutDayInput = {
    create?: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput> | GameCinema1TriesCreateWithoutDayInput[] | GameCinema1TriesUncheckedCreateWithoutDayInput[]
    connectOrCreate?: GameCinema1TriesCreateOrConnectWithoutDayInput | GameCinema1TriesCreateOrConnectWithoutDayInput[]
    createMany?: GameCinema1TriesCreateManyDayInputEnvelope
    connect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
  }

  export type DataMovieUpdateOneRequiredWithoutGameDaysNestedInput = {
    create?: XOR<DataMovieCreateWithoutGameDaysInput, DataMovieUncheckedCreateWithoutGameDaysInput>
    connectOrCreate?: DataMovieCreateOrConnectWithoutGameDaysInput
    upsert?: DataMovieUpsertWithoutGameDaysInput
    connect?: DataMovieWhereUniqueInput
    update?: XOR<XOR<DataMovieUpdateToOneWithWhereWithoutGameDaysInput, DataMovieUpdateWithoutGameDaysInput>, DataMovieUncheckedUpdateWithoutGameDaysInput>
  }

  export type GameCinema1TriesUpdateManyWithoutDayNestedInput = {
    create?: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput> | GameCinema1TriesCreateWithoutDayInput[] | GameCinema1TriesUncheckedCreateWithoutDayInput[]
    connectOrCreate?: GameCinema1TriesCreateOrConnectWithoutDayInput | GameCinema1TriesCreateOrConnectWithoutDayInput[]
    upsert?: GameCinema1TriesUpsertWithWhereUniqueWithoutDayInput | GameCinema1TriesUpsertWithWhereUniqueWithoutDayInput[]
    createMany?: GameCinema1TriesCreateManyDayInputEnvelope
    set?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    disconnect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    delete?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    connect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    update?: GameCinema1TriesUpdateWithWhereUniqueWithoutDayInput | GameCinema1TriesUpdateWithWhereUniqueWithoutDayInput[]
    updateMany?: GameCinema1TriesUpdateManyWithWhereWithoutDayInput | GameCinema1TriesUpdateManyWithWhereWithoutDayInput[]
    deleteMany?: GameCinema1TriesScalarWhereInput | GameCinema1TriesScalarWhereInput[]
  }

  export type GameCinema1TriesUncheckedUpdateManyWithoutDayNestedInput = {
    create?: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput> | GameCinema1TriesCreateWithoutDayInput[] | GameCinema1TriesUncheckedCreateWithoutDayInput[]
    connectOrCreate?: GameCinema1TriesCreateOrConnectWithoutDayInput | GameCinema1TriesCreateOrConnectWithoutDayInput[]
    upsert?: GameCinema1TriesUpsertWithWhereUniqueWithoutDayInput | GameCinema1TriesUpsertWithWhereUniqueWithoutDayInput[]
    createMany?: GameCinema1TriesCreateManyDayInputEnvelope
    set?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    disconnect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    delete?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    connect?: GameCinema1TriesWhereUniqueInput | GameCinema1TriesWhereUniqueInput[]
    update?: GameCinema1TriesUpdateWithWhereUniqueWithoutDayInput | GameCinema1TriesUpdateWithWhereUniqueWithoutDayInput[]
    updateMany?: GameCinema1TriesUpdateManyWithWhereWithoutDayInput | GameCinema1TriesUpdateManyWithWhereWithoutDayInput[]
    deleteMany?: GameCinema1TriesScalarWhereInput | GameCinema1TriesScalarWhereInput[]
  }

  export type GameCinema1DaysCreateNestedOneWithoutTriesInput = {
    create?: XOR<GameCinema1DaysCreateWithoutTriesInput, GameCinema1DaysUncheckedCreateWithoutTriesInput>
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutTriesInput
    connect?: GameCinema1DaysWhereUniqueInput
  }

  export type GameCinema1DaysUpdateOneRequiredWithoutTriesNestedInput = {
    create?: XOR<GameCinema1DaysCreateWithoutTriesInput, GameCinema1DaysUncheckedCreateWithoutTriesInput>
    connectOrCreate?: GameCinema1DaysCreateOrConnectWithoutTriesInput
    upsert?: GameCinema1DaysUpsertWithoutTriesInput
    connect?: GameCinema1DaysWhereUniqueInput
    update?: XOR<XOR<GameCinema1DaysUpdateToOneWithWhereWithoutTriesInput, GameCinema1DaysUpdateWithoutTriesInput>, GameCinema1DaysUncheckedUpdateWithoutTriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type AvatarCreateWithoutUserInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
  }

  export type AvatarUncheckedCreateWithoutUserInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
  }

  export type AvatarCreateOrConnectWithoutUserInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
  }

  export type FriendCreateWithoutUserInput = {
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    friend: UserCreateNestedOneWithoutFriendInput
    userEvents?: UserEventCreateNestedManyWithoutFriendInput
  }

  export type FriendUncheckedCreateWithoutUserInput = {
    id?: number
    friendId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutFriendInput
  }

  export type FriendCreateOrConnectWithoutUserInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendCreateManyUserInputEnvelope = {
    data: FriendCreateManyUserInput | FriendCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendCreateWithoutFriendInput = {
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFriendsInput
    userEvents?: UserEventCreateNestedManyWithoutFriendInput
  }

  export type FriendUncheckedCreateWithoutFriendInput = {
    id?: number
    userId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutFriendInput
  }

  export type FriendCreateOrConnectWithoutFriendInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendCreateManyFriendInputEnvelope = {
    data: FriendCreateManyFriendInput | FriendCreateManyFriendInput[]
    skipDuplicates?: boolean
  }

  export type UserStatsCreateWithoutUserInput = {
    xp?: number
    level?: number
    streak?: number
    lastPlayedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUncheckedCreateWithoutUserInput = {
    id?: number
    xp?: number
    level?: number
    streak?: number
    lastPlayedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsCreateOrConnectWithoutUserInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
  }

  export type UserEventCreateWithoutUserInput = {
    type: string
    createdAt?: Date | string
    levelUp?: number | null
    attempts?: number | null
    avatarAsset?: AvatarAssetCreateNestedOneWithoutUserEventsInput
    friend?: FriendCreateNestedOneWithoutUserEventsInput
    gameResult?: GameResultCreateNestedOneWithoutUserEventsInput
  }

  export type UserEventUncheckedCreateWithoutUserInput = {
    id?: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventCreateOrConnectWithoutUserInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput>
  }

  export type UserEventCreateManyUserInputEnvelope = {
    data: UserEventCreateManyUserInput | UserEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameResultCreateWithoutUserInput = {
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    game: GameCreateNestedOneWithoutResultsInput
    userEvents?: UserEventCreateNestedManyWithoutGameResultInput
  }

  export type GameResultUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutGameResultInput
  }

  export type GameResultCreateOrConnectWithoutUserInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput>
  }

  export type GameResultCreateManyUserInputEnvelope = {
    data: GameResultCreateManyUserInput | GameResultCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AvatarUpsertWithoutUserInput = {
    update: XOR<AvatarUpdateWithoutUserInput, AvatarUncheckedUpdateWithoutUserInput>
    create: XOR<AvatarCreateWithoutUserInput, AvatarUncheckedCreateWithoutUserInput>
    where?: AvatarWhereInput
  }

  export type AvatarUpdateToOneWithWhereWithoutUserInput = {
    where?: AvatarWhereInput
    data: XOR<AvatarUpdateWithoutUserInput, AvatarUncheckedUpdateWithoutUserInput>
  }

  export type AvatarUpdateWithoutUserInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
  }

  export type AvatarUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FriendUpsertWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
  }

  export type FriendUpdateManyWithWhereWithoutUserInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutUserInput>
  }

  export type FriendScalarWhereInput = {
    AND?: FriendScalarWhereInput | FriendScalarWhereInput[]
    OR?: FriendScalarWhereInput[]
    NOT?: FriendScalarWhereInput | FriendScalarWhereInput[]
    id?: IntFilter<"Friend"> | number
    userId?: IntFilter<"Friend"> | number
    friendId?: IntFilter<"Friend"> | number
    status?: StringFilter<"Friend"> | string
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Friend"> | Date | string | null
  }

  export type FriendUpsertWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
  }

  export type FriendUpdateManyWithWhereWithoutFriendInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutFriendInput>
  }

  export type UserStatsUpsertWithoutUserInput = {
    update: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserStatsUpdateWithoutUserInput = {
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventUpsertWithWhereUniqueWithoutUserInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutUserInput, UserEventUncheckedUpdateWithoutUserInput>
    create: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutUserInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutUserInput, UserEventUncheckedUpdateWithoutUserInput>
  }

  export type UserEventUpdateManyWithWhereWithoutUserInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutUserInput>
  }

  export type UserEventScalarWhereInput = {
    AND?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
    OR?: UserEventScalarWhereInput[]
    NOT?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
    id?: IntFilter<"UserEvent"> | number
    userId?: IntFilter<"UserEvent"> | number
    type?: StringFilter<"UserEvent"> | string
    createdAt?: DateTimeFilter<"UserEvent"> | Date | string
    avatarAssetId?: IntNullableFilter<"UserEvent"> | number | null
    friendId?: IntNullableFilter<"UserEvent"> | number | null
    gameResultId?: IntNullableFilter<"UserEvent"> | number | null
    levelUp?: IntNullableFilter<"UserEvent"> | number | null
    attempts?: IntNullableFilter<"UserEvent"> | number | null
  }

  export type GameResultUpsertWithWhereUniqueWithoutUserInput = {
    where: GameResultWhereUniqueInput
    update: XOR<GameResultUpdateWithoutUserInput, GameResultUncheckedUpdateWithoutUserInput>
    create: XOR<GameResultCreateWithoutUserInput, GameResultUncheckedCreateWithoutUserInput>
  }

  export type GameResultUpdateWithWhereUniqueWithoutUserInput = {
    where: GameResultWhereUniqueInput
    data: XOR<GameResultUpdateWithoutUserInput, GameResultUncheckedUpdateWithoutUserInput>
  }

  export type GameResultUpdateManyWithWhereWithoutUserInput = {
    where: GameResultScalarWhereInput
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyWithoutUserInput>
  }

  export type GameResultScalarWhereInput = {
    AND?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
    OR?: GameResultScalarWhereInput[]
    NOT?: GameResultScalarWhereInput | GameResultScalarWhereInput[]
    id?: IntFilter<"GameResult"> | number
    userId?: IntFilter<"GameResult"> | number
    gameId?: IntFilter<"GameResult"> | number
    score?: IntFilter<"GameResult"> | number
    xpGained?: IntFilter<"GameResult"> | number
    status?: StringFilter<"GameResult"> | string
    date?: DateTimeFilter<"GameResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"GameResult"> | Date | string | null
  }

  export type AvatarAssetCreateWithoutShapesInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    eyes?: AvatarCreateNestedManyWithoutEyesInput
    mouths?: AvatarCreateNestedManyWithoutMouthInput
    patterns?: AvatarCreateNestedManyWithoutPatternInput
    userEvents?: UserEventCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUncheckedCreateWithoutShapesInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    eyes?: AvatarUncheckedCreateNestedManyWithoutEyesInput
    mouths?: AvatarUncheckedCreateNestedManyWithoutMouthInput
    patterns?: AvatarUncheckedCreateNestedManyWithoutPatternInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetCreateOrConnectWithoutShapesInput = {
    where: AvatarAssetWhereUniqueInput
    create: XOR<AvatarAssetCreateWithoutShapesInput, AvatarAssetUncheckedCreateWithoutShapesInput>
  }

  export type AvatarAssetCreateWithoutEyesInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarCreateNestedManyWithoutShapeInput
    mouths?: AvatarCreateNestedManyWithoutMouthInput
    patterns?: AvatarCreateNestedManyWithoutPatternInput
    userEvents?: UserEventCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUncheckedCreateWithoutEyesInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarUncheckedCreateNestedManyWithoutShapeInput
    mouths?: AvatarUncheckedCreateNestedManyWithoutMouthInput
    patterns?: AvatarUncheckedCreateNestedManyWithoutPatternInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetCreateOrConnectWithoutEyesInput = {
    where: AvatarAssetWhereUniqueInput
    create: XOR<AvatarAssetCreateWithoutEyesInput, AvatarAssetUncheckedCreateWithoutEyesInput>
  }

  export type AvatarAssetCreateWithoutMouthsInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarCreateNestedManyWithoutShapeInput
    eyes?: AvatarCreateNestedManyWithoutEyesInput
    patterns?: AvatarCreateNestedManyWithoutPatternInput
    userEvents?: UserEventCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUncheckedCreateWithoutMouthsInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarUncheckedCreateNestedManyWithoutShapeInput
    eyes?: AvatarUncheckedCreateNestedManyWithoutEyesInput
    patterns?: AvatarUncheckedCreateNestedManyWithoutPatternInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetCreateOrConnectWithoutMouthsInput = {
    where: AvatarAssetWhereUniqueInput
    create: XOR<AvatarAssetCreateWithoutMouthsInput, AvatarAssetUncheckedCreateWithoutMouthsInput>
  }

  export type AvatarAssetCreateWithoutPatternsInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarCreateNestedManyWithoutShapeInput
    eyes?: AvatarCreateNestedManyWithoutEyesInput
    mouths?: AvatarCreateNestedManyWithoutMouthInput
    userEvents?: UserEventCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetUncheckedCreateWithoutPatternsInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarUncheckedCreateNestedManyWithoutShapeInput
    eyes?: AvatarUncheckedCreateNestedManyWithoutEyesInput
    mouths?: AvatarUncheckedCreateNestedManyWithoutMouthInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutAvatarAssetInput
  }

  export type AvatarAssetCreateOrConnectWithoutPatternsInput = {
    where: AvatarAssetWhereUniqueInput
    create: XOR<AvatarAssetCreateWithoutPatternsInput, AvatarAssetUncheckedCreateWithoutPatternsInput>
  }

  export type ColorCreateWithoutColorShapeInput = {
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorPattern?: AvatarCreateNestedManyWithoutColorPatternInput
  }

  export type ColorUncheckedCreateWithoutColorShapeInput = {
    id?: number
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorPattern?: AvatarUncheckedCreateNestedManyWithoutColorPatternInput
  }

  export type ColorCreateOrConnectWithoutColorShapeInput = {
    where: ColorWhereUniqueInput
    create: XOR<ColorCreateWithoutColorShapeInput, ColorUncheckedCreateWithoutColorShapeInput>
  }

  export type ColorCreateWithoutColorPatternInput = {
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorShape?: AvatarCreateNestedManyWithoutColorShapeInput
  }

  export type ColorUncheckedCreateWithoutColorPatternInput = {
    id?: number
    name: string
    value: string
    gradientValue?: string | null
    level?: number
    vip?: boolean
    colorShape?: AvatarUncheckedCreateNestedManyWithoutColorShapeInput
  }

  export type ColorCreateOrConnectWithoutColorPatternInput = {
    where: ColorWhereUniqueInput
    create: XOR<ColorCreateWithoutColorPatternInput, ColorUncheckedCreateWithoutColorPatternInput>
  }

  export type UserCreateWithoutAvatarInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    friends?: FriendCreateNestedManyWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAvatarInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAvatarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type AvatarAssetUpsertWithoutShapesInput = {
    update: XOR<AvatarAssetUpdateWithoutShapesInput, AvatarAssetUncheckedUpdateWithoutShapesInput>
    create: XOR<AvatarAssetCreateWithoutShapesInput, AvatarAssetUncheckedCreateWithoutShapesInput>
    where?: AvatarAssetWhereInput
  }

  export type AvatarAssetUpdateToOneWithWhereWithoutShapesInput = {
    where?: AvatarAssetWhereInput
    data: XOR<AvatarAssetUpdateWithoutShapesInput, AvatarAssetUncheckedUpdateWithoutShapesInput>
  }

  export type AvatarAssetUpdateWithoutShapesInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    eyes?: AvatarUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUncheckedUpdateWithoutShapesInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    eyes?: AvatarUncheckedUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUncheckedUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUncheckedUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUpsertWithoutEyesInput = {
    update: XOR<AvatarAssetUpdateWithoutEyesInput, AvatarAssetUncheckedUpdateWithoutEyesInput>
    create: XOR<AvatarAssetCreateWithoutEyesInput, AvatarAssetUncheckedCreateWithoutEyesInput>
    where?: AvatarAssetWhereInput
  }

  export type AvatarAssetUpdateToOneWithWhereWithoutEyesInput = {
    where?: AvatarAssetWhereInput
    data: XOR<AvatarAssetUpdateWithoutEyesInput, AvatarAssetUncheckedUpdateWithoutEyesInput>
  }

  export type AvatarAssetUpdateWithoutEyesInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUpdateManyWithoutShapeNestedInput
    mouths?: AvatarUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUncheckedUpdateWithoutEyesInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUncheckedUpdateManyWithoutShapeNestedInput
    mouths?: AvatarUncheckedUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUncheckedUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUpsertWithoutMouthsInput = {
    update: XOR<AvatarAssetUpdateWithoutMouthsInput, AvatarAssetUncheckedUpdateWithoutMouthsInput>
    create: XOR<AvatarAssetCreateWithoutMouthsInput, AvatarAssetUncheckedCreateWithoutMouthsInput>
    where?: AvatarAssetWhereInput
  }

  export type AvatarAssetUpdateToOneWithWhereWithoutMouthsInput = {
    where?: AvatarAssetWhereInput
    data: XOR<AvatarAssetUpdateWithoutMouthsInput, AvatarAssetUncheckedUpdateWithoutMouthsInput>
  }

  export type AvatarAssetUpdateWithoutMouthsInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUpdateManyWithoutEyesNestedInput
    patterns?: AvatarUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUncheckedUpdateWithoutMouthsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUncheckedUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUncheckedUpdateManyWithoutEyesNestedInput
    patterns?: AvatarUncheckedUpdateManyWithoutPatternNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUpsertWithoutPatternsInput = {
    update: XOR<AvatarAssetUpdateWithoutPatternsInput, AvatarAssetUncheckedUpdateWithoutPatternsInput>
    create: XOR<AvatarAssetCreateWithoutPatternsInput, AvatarAssetUncheckedCreateWithoutPatternsInput>
    where?: AvatarAssetWhereInput
  }

  export type AvatarAssetUpdateToOneWithWhereWithoutPatternsInput = {
    where?: AvatarAssetWhereInput
    data: XOR<AvatarAssetUpdateWithoutPatternsInput, AvatarAssetUncheckedUpdateWithoutPatternsInput>
  }

  export type AvatarAssetUpdateWithoutPatternsInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUpdateManyWithoutMouthNestedInput
    userEvents?: UserEventUpdateManyWithoutAvatarAssetNestedInput
  }

  export type AvatarAssetUncheckedUpdateWithoutPatternsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUncheckedUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUncheckedUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUncheckedUpdateManyWithoutMouthNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutAvatarAssetNestedInput
  }

  export type ColorUpsertWithoutColorShapeInput = {
    update: XOR<ColorUpdateWithoutColorShapeInput, ColorUncheckedUpdateWithoutColorShapeInput>
    create: XOR<ColorCreateWithoutColorShapeInput, ColorUncheckedCreateWithoutColorShapeInput>
    where?: ColorWhereInput
  }

  export type ColorUpdateToOneWithWhereWithoutColorShapeInput = {
    where?: ColorWhereInput
    data: XOR<ColorUpdateWithoutColorShapeInput, ColorUncheckedUpdateWithoutColorShapeInput>
  }

  export type ColorUpdateWithoutColorShapeInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorPattern?: AvatarUpdateManyWithoutColorPatternNestedInput
  }

  export type ColorUncheckedUpdateWithoutColorShapeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorPattern?: AvatarUncheckedUpdateManyWithoutColorPatternNestedInput
  }

  export type ColorUpsertWithoutColorPatternInput = {
    update: XOR<ColorUpdateWithoutColorPatternInput, ColorUncheckedUpdateWithoutColorPatternInput>
    create: XOR<ColorCreateWithoutColorPatternInput, ColorUncheckedCreateWithoutColorPatternInput>
    where?: ColorWhereInput
  }

  export type ColorUpdateToOneWithWhereWithoutColorPatternInput = {
    where?: ColorWhereInput
    data: XOR<ColorUpdateWithoutColorPatternInput, ColorUncheckedUpdateWithoutColorPatternInput>
  }

  export type ColorUpdateWithoutColorPatternInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorShape?: AvatarUpdateManyWithoutColorShapeNestedInput
  }

  export type ColorUncheckedUpdateWithoutColorPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    gradientValue?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    vip?: BoolFieldUpdateOperationsInput | boolean
    colorShape?: AvatarUncheckedUpdateManyWithoutColorShapeNestedInput
  }

  export type UserUpsertWithoutAvatarInput = {
    update: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAvatarInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
  }

  export type UserUpdateWithoutAvatarInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friends?: FriendUpdateManyWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AvatarCreateWithoutColorShapeInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutColorShapeInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateOrConnectWithoutColorShapeInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput>
  }

  export type AvatarCreateManyColorShapeInputEnvelope = {
    data: AvatarCreateManyColorShapeInput | AvatarCreateManyColorShapeInput[]
    skipDuplicates?: boolean
  }

  export type AvatarCreateWithoutColorPatternInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutColorPatternInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    userId: number
  }

  export type AvatarCreateOrConnectWithoutColorPatternInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput>
  }

  export type AvatarCreateManyColorPatternInputEnvelope = {
    data: AvatarCreateManyColorPatternInput | AvatarCreateManyColorPatternInput[]
    skipDuplicates?: boolean
  }

  export type AvatarUpsertWithWhereUniqueWithoutColorShapeInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutColorShapeInput, AvatarUncheckedUpdateWithoutColorShapeInput>
    create: XOR<AvatarCreateWithoutColorShapeInput, AvatarUncheckedCreateWithoutColorShapeInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutColorShapeInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutColorShapeInput, AvatarUncheckedUpdateWithoutColorShapeInput>
  }

  export type AvatarUpdateManyWithWhereWithoutColorShapeInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutColorShapeInput>
  }

  export type AvatarScalarWhereInput = {
    AND?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
    OR?: AvatarScalarWhereInput[]
    NOT?: AvatarScalarWhereInput | AvatarScalarWhereInput[]
    id?: IntFilter<"Avatar"> | number
    url?: StringFilter<"Avatar"> | string
    shapeId?: IntFilter<"Avatar"> | number
    eyesId?: IntFilter<"Avatar"> | number
    mouthId?: IntFilter<"Avatar"> | number
    patternId?: IntNullableFilter<"Avatar"> | number | null
    colorShapeId?: IntFilter<"Avatar"> | number
    colorPatternId?: IntNullableFilter<"Avatar"> | number | null
    userId?: IntFilter<"Avatar"> | number
  }

  export type AvatarUpsertWithWhereUniqueWithoutColorPatternInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutColorPatternInput, AvatarUncheckedUpdateWithoutColorPatternInput>
    create: XOR<AvatarCreateWithoutColorPatternInput, AvatarUncheckedCreateWithoutColorPatternInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutColorPatternInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutColorPatternInput, AvatarUncheckedUpdateWithoutColorPatternInput>
  }

  export type AvatarUpdateManyWithWhereWithoutColorPatternInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutColorPatternInput>
  }

  export type AvatarCreateWithoutShapeInput = {
    url: string
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutShapeInput = {
    id?: number
    url: string
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateOrConnectWithoutShapeInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput>
  }

  export type AvatarCreateManyShapeInputEnvelope = {
    data: AvatarCreateManyShapeInput | AvatarCreateManyShapeInput[]
    skipDuplicates?: boolean
  }

  export type AvatarCreateWithoutEyesInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutEyesInput = {
    id?: number
    url: string
    shapeId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateOrConnectWithoutEyesInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput>
  }

  export type AvatarCreateManyEyesInputEnvelope = {
    data: AvatarCreateManyEyesInput | AvatarCreateManyEyesInput[]
    skipDuplicates?: boolean
  }

  export type AvatarCreateWithoutMouthInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    pattern?: AvatarAssetCreateNestedOneWithoutPatternsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutMouthInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateOrConnectWithoutMouthInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput>
  }

  export type AvatarCreateManyMouthInputEnvelope = {
    data: AvatarCreateManyMouthInput | AvatarCreateManyMouthInput[]
    skipDuplicates?: boolean
  }

  export type AvatarCreateWithoutPatternInput = {
    url: string
    shape: AvatarAssetCreateNestedOneWithoutShapesInput
    eyes: AvatarAssetCreateNestedOneWithoutEyesInput
    mouth: AvatarAssetCreateNestedOneWithoutMouthsInput
    colorShape: ColorCreateNestedOneWithoutColorShapeInput
    colorPattern?: ColorCreateNestedOneWithoutColorPatternInput
    user: UserCreateNestedOneWithoutAvatarInput
  }

  export type AvatarUncheckedCreateWithoutPatternInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateOrConnectWithoutPatternInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput>
  }

  export type AvatarCreateManyPatternInputEnvelope = {
    data: AvatarCreateManyPatternInput | AvatarCreateManyPatternInput[]
    skipDuplicates?: boolean
  }

  export type UserEventCreateWithoutAvatarAssetInput = {
    type: string
    createdAt?: Date | string
    levelUp?: number | null
    attempts?: number | null
    friend?: FriendCreateNestedOneWithoutUserEventsInput
    gameResult?: GameResultCreateNestedOneWithoutUserEventsInput
    user: UserCreateNestedOneWithoutUserEventsInput
  }

  export type UserEventUncheckedCreateWithoutAvatarAssetInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventCreateOrConnectWithoutAvatarAssetInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput>
  }

  export type UserEventCreateManyAvatarAssetInputEnvelope = {
    data: UserEventCreateManyAvatarAssetInput | UserEventCreateManyAvatarAssetInput[]
    skipDuplicates?: boolean
  }

  export type AvatarUpsertWithWhereUniqueWithoutShapeInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutShapeInput, AvatarUncheckedUpdateWithoutShapeInput>
    create: XOR<AvatarCreateWithoutShapeInput, AvatarUncheckedCreateWithoutShapeInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutShapeInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutShapeInput, AvatarUncheckedUpdateWithoutShapeInput>
  }

  export type AvatarUpdateManyWithWhereWithoutShapeInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutShapeInput>
  }

  export type AvatarUpsertWithWhereUniqueWithoutEyesInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutEyesInput, AvatarUncheckedUpdateWithoutEyesInput>
    create: XOR<AvatarCreateWithoutEyesInput, AvatarUncheckedCreateWithoutEyesInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutEyesInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutEyesInput, AvatarUncheckedUpdateWithoutEyesInput>
  }

  export type AvatarUpdateManyWithWhereWithoutEyesInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutEyesInput>
  }

  export type AvatarUpsertWithWhereUniqueWithoutMouthInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutMouthInput, AvatarUncheckedUpdateWithoutMouthInput>
    create: XOR<AvatarCreateWithoutMouthInput, AvatarUncheckedCreateWithoutMouthInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutMouthInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutMouthInput, AvatarUncheckedUpdateWithoutMouthInput>
  }

  export type AvatarUpdateManyWithWhereWithoutMouthInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutMouthInput>
  }

  export type AvatarUpsertWithWhereUniqueWithoutPatternInput = {
    where: AvatarWhereUniqueInput
    update: XOR<AvatarUpdateWithoutPatternInput, AvatarUncheckedUpdateWithoutPatternInput>
    create: XOR<AvatarCreateWithoutPatternInput, AvatarUncheckedCreateWithoutPatternInput>
  }

  export type AvatarUpdateWithWhereUniqueWithoutPatternInput = {
    where: AvatarWhereUniqueInput
    data: XOR<AvatarUpdateWithoutPatternInput, AvatarUncheckedUpdateWithoutPatternInput>
  }

  export type AvatarUpdateManyWithWhereWithoutPatternInput = {
    where: AvatarScalarWhereInput
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyWithoutPatternInput>
  }

  export type UserEventUpsertWithWhereUniqueWithoutAvatarAssetInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutAvatarAssetInput, UserEventUncheckedUpdateWithoutAvatarAssetInput>
    create: XOR<UserEventCreateWithoutAvatarAssetInput, UserEventUncheckedCreateWithoutAvatarAssetInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutAvatarAssetInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutAvatarAssetInput, UserEventUncheckedUpdateWithoutAvatarAssetInput>
  }

  export type UserEventUpdateManyWithWhereWithoutAvatarAssetInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutAvatarAssetInput>
  }

  export type UserCreateWithoutFriendsInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendsInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
  }

  export type UserCreateWithoutFriendInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friends?: FriendCreateNestedManyWithoutUserInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendInput, UserUncheckedCreateWithoutFriendInput>
  }

  export type UserEventCreateWithoutFriendInput = {
    type: string
    createdAt?: Date | string
    levelUp?: number | null
    attempts?: number | null
    avatarAsset?: AvatarAssetCreateNestedOneWithoutUserEventsInput
    gameResult?: GameResultCreateNestedOneWithoutUserEventsInput
    user: UserCreateNestedOneWithoutUserEventsInput
  }

  export type UserEventUncheckedCreateWithoutFriendInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventCreateOrConnectWithoutFriendInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput>
  }

  export type UserEventCreateManyFriendInputEnvelope = {
    data: UserEventCreateManyFriendInput | UserEventCreateManyFriendInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFriendsInput = {
    update: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
    create: XOR<UserCreateWithoutFriendsInput, UserUncheckedCreateWithoutFriendsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendsInput, UserUncheckedUpdateWithoutFriendsInput>
  }

  export type UserUpdateWithoutFriendsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFriendInput = {
    update: XOR<UserUpdateWithoutFriendInput, UserUncheckedUpdateWithoutFriendInput>
    create: XOR<UserCreateWithoutFriendInput, UserUncheckedCreateWithoutFriendInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendInput, UserUncheckedUpdateWithoutFriendInput>
  }

  export type UserUpdateWithoutFriendInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friends?: FriendUpdateManyWithoutUserNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserEventUpsertWithWhereUniqueWithoutFriendInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutFriendInput, UserEventUncheckedUpdateWithoutFriendInput>
    create: XOR<UserEventCreateWithoutFriendInput, UserEventUncheckedCreateWithoutFriendInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutFriendInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutFriendInput, UserEventUncheckedUpdateWithoutFriendInput>
  }

  export type UserEventUpdateManyWithWhereWithoutFriendInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutFriendInput>
  }

  export type UserCreateWithoutUserStatsInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friends?: FriendCreateNestedManyWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserStatsInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserStatsInput, UserUncheckedCreateWithoutUserStatsInput>
  }

  export type UserUpsertWithoutUserStatsInput = {
    update: XOR<UserUpdateWithoutUserStatsInput, UserUncheckedUpdateWithoutUserStatsInput>
    create: XOR<UserCreateWithoutUserStatsInput, UserUncheckedCreateWithoutUserStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserStatsInput, UserUncheckedUpdateWithoutUserStatsInput>
  }

  export type UserUpdateWithoutUserStatsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friends?: FriendUpdateManyWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserStatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AvatarAssetCreateWithoutUserEventsInput = {
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarCreateNestedManyWithoutShapeInput
    eyes?: AvatarCreateNestedManyWithoutEyesInput
    mouths?: AvatarCreateNestedManyWithoutMouthInput
    patterns?: AvatarCreateNestedManyWithoutPatternInput
  }

  export type AvatarAssetUncheckedCreateWithoutUserEventsInput = {
    id?: number
    type: string
    name: string
    url: string
    level?: number
    vipOnly?: boolean
    shapes?: AvatarUncheckedCreateNestedManyWithoutShapeInput
    eyes?: AvatarUncheckedCreateNestedManyWithoutEyesInput
    mouths?: AvatarUncheckedCreateNestedManyWithoutMouthInput
    patterns?: AvatarUncheckedCreateNestedManyWithoutPatternInput
  }

  export type AvatarAssetCreateOrConnectWithoutUserEventsInput = {
    where: AvatarAssetWhereUniqueInput
    create: XOR<AvatarAssetCreateWithoutUserEventsInput, AvatarAssetUncheckedCreateWithoutUserEventsInput>
  }

  export type FriendCreateWithoutUserEventsInput = {
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFriendsInput
    friend: UserCreateNestedOneWithoutFriendInput
  }

  export type FriendUncheckedCreateWithoutUserEventsInput = {
    id?: number
    userId: number
    friendId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FriendCreateOrConnectWithoutUserEventsInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutUserEventsInput, FriendUncheckedCreateWithoutUserEventsInput>
  }

  export type GameResultCreateWithoutUserEventsInput = {
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGameResultsInput
    game: GameCreateNestedOneWithoutResultsInput
  }

  export type GameResultUncheckedCreateWithoutUserEventsInput = {
    id?: number
    userId: number
    gameId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
  }

  export type GameResultCreateOrConnectWithoutUserEventsInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutUserEventsInput, GameResultUncheckedCreateWithoutUserEventsInput>
  }

  export type UserCreateWithoutUserEventsInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friends?: FriendCreateNestedManyWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    gameResults?: GameResultCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserEventsInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    gameResults?: GameResultUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserEventsInput, UserUncheckedCreateWithoutUserEventsInput>
  }

  export type AvatarAssetUpsertWithoutUserEventsInput = {
    update: XOR<AvatarAssetUpdateWithoutUserEventsInput, AvatarAssetUncheckedUpdateWithoutUserEventsInput>
    create: XOR<AvatarAssetCreateWithoutUserEventsInput, AvatarAssetUncheckedCreateWithoutUserEventsInput>
    where?: AvatarAssetWhereInput
  }

  export type AvatarAssetUpdateToOneWithWhereWithoutUserEventsInput = {
    where?: AvatarAssetWhereInput
    data: XOR<AvatarAssetUpdateWithoutUserEventsInput, AvatarAssetUncheckedUpdateWithoutUserEventsInput>
  }

  export type AvatarAssetUpdateWithoutUserEventsInput = {
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUpdateManyWithoutPatternNestedInput
  }

  export type AvatarAssetUncheckedUpdateWithoutUserEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    vipOnly?: BoolFieldUpdateOperationsInput | boolean
    shapes?: AvatarUncheckedUpdateManyWithoutShapeNestedInput
    eyes?: AvatarUncheckedUpdateManyWithoutEyesNestedInput
    mouths?: AvatarUncheckedUpdateManyWithoutMouthNestedInput
    patterns?: AvatarUncheckedUpdateManyWithoutPatternNestedInput
  }

  export type FriendUpsertWithoutUserEventsInput = {
    update: XOR<FriendUpdateWithoutUserEventsInput, FriendUncheckedUpdateWithoutUserEventsInput>
    create: XOR<FriendCreateWithoutUserEventsInput, FriendUncheckedCreateWithoutUserEventsInput>
    where?: FriendWhereInput
  }

  export type FriendUpdateToOneWithWhereWithoutUserEventsInput = {
    where?: FriendWhereInput
    data: XOR<FriendUpdateWithoutUserEventsInput, FriendUncheckedUpdateWithoutUserEventsInput>
  }

  export type FriendUpdateWithoutUserEventsInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFriendsNestedInput
    friend?: UserUpdateOneRequiredWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateWithoutUserEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    friendId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameResultUpsertWithoutUserEventsInput = {
    update: XOR<GameResultUpdateWithoutUserEventsInput, GameResultUncheckedUpdateWithoutUserEventsInput>
    create: XOR<GameResultCreateWithoutUserEventsInput, GameResultUncheckedCreateWithoutUserEventsInput>
    where?: GameResultWhereInput
  }

  export type GameResultUpdateToOneWithWhereWithoutUserEventsInput = {
    where?: GameResultWhereInput
    data: XOR<GameResultUpdateWithoutUserEventsInput, GameResultUncheckedUpdateWithoutUserEventsInput>
  }

  export type GameResultUpdateWithoutUserEventsInput = {
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGameResultsNestedInput
    game?: GameUpdateOneRequiredWithoutResultsNestedInput
  }

  export type GameResultUncheckedUpdateWithoutUserEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutUserEventsInput = {
    update: XOR<UserUpdateWithoutUserEventsInput, UserUncheckedUpdateWithoutUserEventsInput>
    create: XOR<UserCreateWithoutUserEventsInput, UserUncheckedCreateWithoutUserEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserEventsInput, UserUncheckedUpdateWithoutUserEventsInput>
  }

  export type UserUpdateWithoutUserEventsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friends?: FriendUpdateManyWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    gameResults?: GameResultUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    gameResults?: GameResultUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGameResultsInput = {
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarCreateNestedOneWithoutUserInput
    friends?: FriendCreateNestedManyWithoutUserInput
    friend?: FriendCreateNestedManyWithoutFriendInput
    userStats?: UserStatsCreateNestedOneWithoutUserInput
    userEvents?: UserEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGameResultsInput = {
    id?: number
    email: string
    password: string
    pseudo: string
    firstName?: string | null
    lastName?: string | null
    birthdate?: Date | string | null
    isVip?: boolean
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    avatar?: AvatarUncheckedCreateNestedOneWithoutUserInput
    friends?: FriendUncheckedCreateNestedManyWithoutUserInput
    friend?: FriendUncheckedCreateNestedManyWithoutFriendInput
    userStats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    userEvents?: UserEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGameResultsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameResultsInput, UserUncheckedCreateWithoutGameResultsInput>
  }

  export type GameCreateWithoutResultsInput = {
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    status?: string
    gameCategory: GameCategoryCreateNestedOneWithoutGamesInput
  }

  export type GameUncheckedCreateWithoutResultsInput = {
    id?: number
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    gameCategoryId: number
    status?: string
  }

  export type GameCreateOrConnectWithoutResultsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutResultsInput, GameUncheckedCreateWithoutResultsInput>
  }

  export type UserEventCreateWithoutGameResultInput = {
    type: string
    createdAt?: Date | string
    levelUp?: number | null
    attempts?: number | null
    avatarAsset?: AvatarAssetCreateNestedOneWithoutUserEventsInput
    friend?: FriendCreateNestedOneWithoutUserEventsInput
    user: UserCreateNestedOneWithoutUserEventsInput
  }

  export type UserEventUncheckedCreateWithoutGameResultInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventCreateOrConnectWithoutGameResultInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput>
  }

  export type UserEventCreateManyGameResultInputEnvelope = {
    data: UserEventCreateManyGameResultInput | UserEventCreateManyGameResultInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGameResultsInput = {
    update: XOR<UserUpdateWithoutGameResultsInput, UserUncheckedUpdateWithoutGameResultsInput>
    create: XOR<UserCreateWithoutGameResultsInput, UserUncheckedCreateWithoutGameResultsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameResultsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameResultsInput, UserUncheckedUpdateWithoutGameResultsInput>
  }

  export type UserUpdateWithoutGameResultsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUpdateOneWithoutUserNestedInput
    friends?: FriendUpdateManyWithoutUserNestedInput
    friend?: FriendUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGameResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    pseudo?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVip?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar?: AvatarUncheckedUpdateOneWithoutUserNestedInput
    friends?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friend?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    userStats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    userEvents?: UserEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GameUpsertWithoutResultsInput = {
    update: XOR<GameUpdateWithoutResultsInput, GameUncheckedUpdateWithoutResultsInput>
    create: XOR<GameCreateWithoutResultsInput, GameUncheckedCreateWithoutResultsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutResultsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutResultsInput, GameUncheckedUpdateWithoutResultsInput>
  }

  export type GameUpdateWithoutResultsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    gameCategory?: GameCategoryUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gameCategoryId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserEventUpsertWithWhereUniqueWithoutGameResultInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutGameResultInput, UserEventUncheckedUpdateWithoutGameResultInput>
    create: XOR<UserEventCreateWithoutGameResultInput, UserEventUncheckedCreateWithoutGameResultInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutGameResultInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutGameResultInput, UserEventUncheckedUpdateWithoutGameResultInput>
  }

  export type UserEventUpdateManyWithWhereWithoutGameResultInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutGameResultInput>
  }

  export type GameCategoryCreateWithoutGamesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    color?: string | null
  }

  export type GameCategoryUncheckedCreateWithoutGamesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    color?: string | null
  }

  export type GameCategoryCreateOrConnectWithoutGamesInput = {
    where: GameCategoryWhereUniqueInput
    create: XOR<GameCategoryCreateWithoutGamesInput, GameCategoryUncheckedCreateWithoutGamesInput>
  }

  export type GameResultCreateWithoutGameInput = {
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutGameResultsInput
    userEvents?: UserEventCreateNestedManyWithoutGameResultInput
  }

  export type GameResultUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
    userEvents?: UserEventUncheckedCreateNestedManyWithoutGameResultInput
  }

  export type GameResultCreateOrConnectWithoutGameInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput>
  }

  export type GameResultCreateManyGameInputEnvelope = {
    data: GameResultCreateManyGameInput | GameResultCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GameCategoryUpsertWithoutGamesInput = {
    update: XOR<GameCategoryUpdateWithoutGamesInput, GameCategoryUncheckedUpdateWithoutGamesInput>
    create: XOR<GameCategoryCreateWithoutGamesInput, GameCategoryUncheckedCreateWithoutGamesInput>
    where?: GameCategoryWhereInput
  }

  export type GameCategoryUpdateToOneWithWhereWithoutGamesInput = {
    where?: GameCategoryWhereInput
    data: XOR<GameCategoryUpdateWithoutGamesInput, GameCategoryUncheckedUpdateWithoutGamesInput>
  }

  export type GameCategoryUpdateWithoutGamesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameCategoryUncheckedUpdateWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameResultUpsertWithWhereUniqueWithoutGameInput = {
    where: GameResultWhereUniqueInput
    update: XOR<GameResultUpdateWithoutGameInput, GameResultUncheckedUpdateWithoutGameInput>
    create: XOR<GameResultCreateWithoutGameInput, GameResultUncheckedCreateWithoutGameInput>
  }

  export type GameResultUpdateWithWhereUniqueWithoutGameInput = {
    where: GameResultWhereUniqueInput
    data: XOR<GameResultUpdateWithoutGameInput, GameResultUncheckedUpdateWithoutGameInput>
  }

  export type GameResultUpdateManyWithWhereWithoutGameInput = {
    where: GameResultScalarWhereInput
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyWithoutGameInput>
  }

  export type GameCreateWithoutGameCategoryInput = {
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    status?: string
    results?: GameResultCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutGameCategoryInput = {
    id?: number
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    status?: string
    results?: GameResultUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutGameCategoryInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput>
  }

  export type GameCreateManyGameCategoryInputEnvelope = {
    data: GameCreateManyGameCategoryInput | GameCreateManyGameCategoryInput[]
    skipDuplicates?: boolean
  }

  export type GameUpsertWithWhereUniqueWithoutGameCategoryInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutGameCategoryInput, GameUncheckedUpdateWithoutGameCategoryInput>
    create: XOR<GameCreateWithoutGameCategoryInput, GameUncheckedCreateWithoutGameCategoryInput>
  }

  export type GameUpdateWithWhereUniqueWithoutGameCategoryInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutGameCategoryInput, GameUncheckedUpdateWithoutGameCategoryInput>
  }

  export type GameUpdateManyWithWhereWithoutGameCategoryInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutGameCategoryInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: IntFilter<"Game"> | number
    name?: StringFilter<"Game"> | string
    description?: StringFilter<"Game"> | string
    imgUrl?: StringNullableFilter<"Game"> | string | null
    path?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    gameCategoryId?: IntFilter<"Game"> | number
    status?: StringFilter<"Game"> | string
  }

  export type GameCinema1DaysCreateWithoutMovieInput = {
    date: Date | string
    createdAt?: Date | string
    tries?: GameCinema1TriesCreateNestedManyWithoutDayInput
  }

  export type GameCinema1DaysUncheckedCreateWithoutMovieInput = {
    id?: number
    date: Date | string
    createdAt?: Date | string
    tries?: GameCinema1TriesUncheckedCreateNestedManyWithoutDayInput
  }

  export type GameCinema1DaysCreateOrConnectWithoutMovieInput = {
    where: GameCinema1DaysWhereUniqueInput
    create: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput>
  }

  export type GameCinema1DaysCreateManyMovieInputEnvelope = {
    data: GameCinema1DaysCreateManyMovieInput | GameCinema1DaysCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type GameCinema1DaysUpsertWithWhereUniqueWithoutMovieInput = {
    where: GameCinema1DaysWhereUniqueInput
    update: XOR<GameCinema1DaysUpdateWithoutMovieInput, GameCinema1DaysUncheckedUpdateWithoutMovieInput>
    create: XOR<GameCinema1DaysCreateWithoutMovieInput, GameCinema1DaysUncheckedCreateWithoutMovieInput>
  }

  export type GameCinema1DaysUpdateWithWhereUniqueWithoutMovieInput = {
    where: GameCinema1DaysWhereUniqueInput
    data: XOR<GameCinema1DaysUpdateWithoutMovieInput, GameCinema1DaysUncheckedUpdateWithoutMovieInput>
  }

  export type GameCinema1DaysUpdateManyWithWhereWithoutMovieInput = {
    where: GameCinema1DaysScalarWhereInput
    data: XOR<GameCinema1DaysUpdateManyMutationInput, GameCinema1DaysUncheckedUpdateManyWithoutMovieInput>
  }

  export type GameCinema1DaysScalarWhereInput = {
    AND?: GameCinema1DaysScalarWhereInput | GameCinema1DaysScalarWhereInput[]
    OR?: GameCinema1DaysScalarWhereInput[]
    NOT?: GameCinema1DaysScalarWhereInput | GameCinema1DaysScalarWhereInput[]
    id?: IntFilter<"GameCinema1Days"> | number
    date?: DateTimeFilter<"GameCinema1Days"> | Date | string
    movieId?: IntFilter<"GameCinema1Days"> | number
    createdAt?: DateTimeFilter<"GameCinema1Days"> | Date | string
  }

  export type DataMovieCreateWithoutGameDaysInput = {
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date | string
    runtime?: number | null
    director?: string | null
    actors?: string | null
    genres: string
    synopsis?: string | null
    production?: string | null
    country?: string | null
    language?: string | null
    voteAverage?: number | null
    voteCount?: number | null
    popularity?: number | null
    budget?: number | null
    keywords?: string | null
    posterPath?: string | null
    backdropPath?: string | null
    image1?: string | null
    image2?: string | null
    image3?: string | null
    image4?: string | null
    image5?: string | null
    image6?: string | null
    image7?: string | null
    image8?: string | null
    image9?: string | null
    image10?: string | null
    createdAt?: Date | string
  }

  export type DataMovieUncheckedCreateWithoutGameDaysInput = {
    id?: number
    tmdbId: number
    title: string
    originalTitle: string
    year: number
    releaseDate: Date | string
    runtime?: number | null
    director?: string | null
    actors?: string | null
    genres: string
    synopsis?: string | null
    production?: string | null
    country?: string | null
    language?: string | null
    voteAverage?: number | null
    voteCount?: number | null
    popularity?: number | null
    budget?: number | null
    keywords?: string | null
    posterPath?: string | null
    backdropPath?: string | null
    image1?: string | null
    image2?: string | null
    image3?: string | null
    image4?: string | null
    image5?: string | null
    image6?: string | null
    image7?: string | null
    image8?: string | null
    image9?: string | null
    image10?: string | null
    createdAt?: Date | string
  }

  export type DataMovieCreateOrConnectWithoutGameDaysInput = {
    where: DataMovieWhereUniqueInput
    create: XOR<DataMovieCreateWithoutGameDaysInput, DataMovieUncheckedCreateWithoutGameDaysInput>
  }

  export type GameCinema1TriesCreateWithoutDayInput = {
    userId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
  }

  export type GameCinema1TriesUncheckedCreateWithoutDayInput = {
    id?: number
    userId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
  }

  export type GameCinema1TriesCreateOrConnectWithoutDayInput = {
    where: GameCinema1TriesWhereUniqueInput
    create: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput>
  }

  export type GameCinema1TriesCreateManyDayInputEnvelope = {
    data: GameCinema1TriesCreateManyDayInput | GameCinema1TriesCreateManyDayInput[]
    skipDuplicates?: boolean
  }

  export type DataMovieUpsertWithoutGameDaysInput = {
    update: XOR<DataMovieUpdateWithoutGameDaysInput, DataMovieUncheckedUpdateWithoutGameDaysInput>
    create: XOR<DataMovieCreateWithoutGameDaysInput, DataMovieUncheckedCreateWithoutGameDaysInput>
    where?: DataMovieWhereInput
  }

  export type DataMovieUpdateToOneWithWhereWithoutGameDaysInput = {
    where?: DataMovieWhereInput
    data: XOR<DataMovieUpdateWithoutGameDaysInput, DataMovieUncheckedUpdateWithoutGameDaysInput>
  }

  export type DataMovieUpdateWithoutGameDaysInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMovieUncheckedUpdateWithoutGameDaysInput = {
    id?: IntFieldUpdateOperationsInput | number
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    originalTitle?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    director?: NullableStringFieldUpdateOperationsInput | string | null
    actors?: NullableStringFieldUpdateOperationsInput | string | null
    genres?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    production?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    voteAverage?: NullableFloatFieldUpdateOperationsInput | number | null
    voteCount?: NullableIntFieldUpdateOperationsInput | number | null
    popularity?: NullableFloatFieldUpdateOperationsInput | number | null
    budget?: NullableIntFieldUpdateOperationsInput | number | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    image1?: NullableStringFieldUpdateOperationsInput | string | null
    image2?: NullableStringFieldUpdateOperationsInput | string | null
    image3?: NullableStringFieldUpdateOperationsInput | string | null
    image4?: NullableStringFieldUpdateOperationsInput | string | null
    image5?: NullableStringFieldUpdateOperationsInput | string | null
    image6?: NullableStringFieldUpdateOperationsInput | string | null
    image7?: NullableStringFieldUpdateOperationsInput | string | null
    image8?: NullableStringFieldUpdateOperationsInput | string | null
    image9?: NullableStringFieldUpdateOperationsInput | string | null
    image10?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesUpsertWithWhereUniqueWithoutDayInput = {
    where: GameCinema1TriesWhereUniqueInput
    update: XOR<GameCinema1TriesUpdateWithoutDayInput, GameCinema1TriesUncheckedUpdateWithoutDayInput>
    create: XOR<GameCinema1TriesCreateWithoutDayInput, GameCinema1TriesUncheckedCreateWithoutDayInput>
  }

  export type GameCinema1TriesUpdateWithWhereUniqueWithoutDayInput = {
    where: GameCinema1TriesWhereUniqueInput
    data: XOR<GameCinema1TriesUpdateWithoutDayInput, GameCinema1TriesUncheckedUpdateWithoutDayInput>
  }

  export type GameCinema1TriesUpdateManyWithWhereWithoutDayInput = {
    where: GameCinema1TriesScalarWhereInput
    data: XOR<GameCinema1TriesUpdateManyMutationInput, GameCinema1TriesUncheckedUpdateManyWithoutDayInput>
  }

  export type GameCinema1TriesScalarWhereInput = {
    AND?: GameCinema1TriesScalarWhereInput | GameCinema1TriesScalarWhereInput[]
    OR?: GameCinema1TriesScalarWhereInput[]
    NOT?: GameCinema1TriesScalarWhereInput | GameCinema1TriesScalarWhereInput[]
    id?: IntFilter<"GameCinema1Tries"> | number
    userId?: IntFilter<"GameCinema1Tries"> | number
    dayId?: IntFilter<"GameCinema1Tries"> | number
    guess?: StringFilter<"GameCinema1Tries"> | string
    correct?: BoolFilter<"GameCinema1Tries"> | boolean
    createdAt?: DateTimeFilter<"GameCinema1Tries"> | Date | string
  }

  export type GameCinema1DaysCreateWithoutTriesInput = {
    date: Date | string
    createdAt?: Date | string
    movie: DataMovieCreateNestedOneWithoutGameDaysInput
  }

  export type GameCinema1DaysUncheckedCreateWithoutTriesInput = {
    id?: number
    date: Date | string
    movieId: number
    createdAt?: Date | string
  }

  export type GameCinema1DaysCreateOrConnectWithoutTriesInput = {
    where: GameCinema1DaysWhereUniqueInput
    create: XOR<GameCinema1DaysCreateWithoutTriesInput, GameCinema1DaysUncheckedCreateWithoutTriesInput>
  }

  export type GameCinema1DaysUpsertWithoutTriesInput = {
    update: XOR<GameCinema1DaysUpdateWithoutTriesInput, GameCinema1DaysUncheckedUpdateWithoutTriesInput>
    create: XOR<GameCinema1DaysCreateWithoutTriesInput, GameCinema1DaysUncheckedCreateWithoutTriesInput>
    where?: GameCinema1DaysWhereInput
  }

  export type GameCinema1DaysUpdateToOneWithWhereWithoutTriesInput = {
    where?: GameCinema1DaysWhereInput
    data: XOR<GameCinema1DaysUpdateWithoutTriesInput, GameCinema1DaysUncheckedUpdateWithoutTriesInput>
  }

  export type GameCinema1DaysUpdateWithoutTriesInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: DataMovieUpdateOneRequiredWithoutGameDaysNestedInput
  }

  export type GameCinema1DaysUncheckedUpdateWithoutTriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    movieId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendCreateManyUserInput = {
    id?: number
    friendId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type FriendCreateManyFriendInput = {
    id?: number
    userId: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserEventCreateManyUserInput = {
    id?: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type GameResultCreateManyUserInput = {
    id?: number
    gameId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
  }

  export type FriendUpdateWithoutUserInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    friend?: UserUpdateOneRequiredWithoutFriendNestedInput
    userEvents?: UserEventUpdateManyWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    friendId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    friendId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FriendUpdateWithoutFriendInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFriendsNestedInput
    userEvents?: UserEventUpdateManyWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateWithoutFriendInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutFriendNestedInput
  }

  export type FriendUncheckedUpdateManyWithoutFriendInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserEventUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
    avatarAsset?: AvatarAssetUpdateOneWithoutUserEventsNestedInput
    friend?: FriendUpdateOneWithoutUserEventsNestedInput
    gameResult?: GameResultUpdateOneWithoutUserEventsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameResultUpdateWithoutUserInput = {
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    game?: GameUpdateOneRequiredWithoutResultsNestedInput
    userEvents?: UserEventUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AvatarCreateManyColorShapeInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateManyColorPatternInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    userId: number
  }

  export type AvatarUpdateWithoutColorShapeInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutColorShapeInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutColorShapeInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUpdateWithoutColorPatternInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutColorPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutColorPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarCreateManyShapeInput = {
    id?: number
    url: string
    eyesId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateManyEyesInput = {
    id?: number
    url: string
    shapeId: number
    mouthId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateManyMouthInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    patternId?: number | null
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type AvatarCreateManyPatternInput = {
    id?: number
    url: string
    shapeId: number
    eyesId: number
    mouthId: number
    colorShapeId: number
    colorPatternId?: number | null
    userId: number
  }

  export type UserEventCreateManyAvatarAssetInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    friendId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type AvatarUpdateWithoutShapeInput = {
    url?: StringFieldUpdateOperationsInput | string
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutShapeInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutShapeInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUpdateWithoutEyesInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutEyesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutEyesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUpdateWithoutMouthInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    pattern?: AvatarAssetUpdateOneWithoutPatternsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutMouthInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutMouthInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    patternId?: NullableIntFieldUpdateOperationsInput | number | null
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUpdateWithoutPatternInput = {
    url?: StringFieldUpdateOperationsInput | string
    shape?: AvatarAssetUpdateOneRequiredWithoutShapesNestedInput
    eyes?: AvatarAssetUpdateOneRequiredWithoutEyesNestedInput
    mouth?: AvatarAssetUpdateOneRequiredWithoutMouthsNestedInput
    colorShape?: ColorUpdateOneRequiredWithoutColorShapeNestedInput
    colorPattern?: ColorUpdateOneWithoutColorPatternNestedInput
    user?: UserUpdateOneRequiredWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateWithoutPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AvatarUncheckedUpdateManyWithoutPatternInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    shapeId?: IntFieldUpdateOperationsInput | number
    eyesId?: IntFieldUpdateOperationsInput | number
    mouthId?: IntFieldUpdateOperationsInput | number
    colorShapeId?: IntFieldUpdateOperationsInput | number
    colorPatternId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserEventUpdateWithoutAvatarAssetInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
    friend?: FriendUpdateOneWithoutUserEventsNestedInput
    gameResult?: GameResultUpdateOneWithoutUserEventsNestedInput
    user?: UserUpdateOneRequiredWithoutUserEventsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutAvatarAssetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventUncheckedUpdateManyWithoutAvatarAssetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventCreateManyFriendInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    gameResultId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventUpdateWithoutFriendInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
    avatarAsset?: AvatarAssetUpdateOneWithoutUserEventsNestedInput
    gameResult?: GameResultUpdateOneWithoutUserEventsNestedInput
    user?: UserUpdateOneRequiredWithoutUserEventsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutFriendInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventUncheckedUpdateManyWithoutFriendInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    gameResultId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventCreateManyGameResultInput = {
    id?: number
    userId: number
    type: string
    createdAt?: Date | string
    avatarAssetId?: number | null
    friendId?: number | null
    levelUp?: number | null
    attempts?: number | null
  }

  export type UserEventUpdateWithoutGameResultInput = {
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
    avatarAsset?: AvatarAssetUpdateOneWithoutUserEventsNestedInput
    friend?: FriendUpdateOneWithoutUserEventsNestedInput
    user?: UserUpdateOneRequiredWithoutUserEventsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutGameResultInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserEventUncheckedUpdateManyWithoutGameResultInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarAssetId?: NullableIntFieldUpdateOperationsInput | number | null
    friendId?: NullableIntFieldUpdateOperationsInput | number | null
    levelUp?: NullableIntFieldUpdateOperationsInput | number | null
    attempts?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameResultCreateManyGameInput = {
    id?: number
    userId: number
    score: number
    xpGained?: number
    status: string
    date?: Date | string
    deletedAt?: Date | string | null
  }

  export type GameResultUpdateWithoutGameInput = {
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutGameResultsNestedInput
    userEvents?: UserEventUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userEvents?: UserEventUncheckedUpdateManyWithoutGameResultNestedInput
  }

  export type GameResultUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    xpGained?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameCreateManyGameCategoryInput = {
    id?: number
    name: string
    description?: string
    imgUrl?: string | null
    path?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    status?: string
  }

  export type GameUpdateWithoutGameCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    results?: GameResultUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutGameCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    results?: GameResultUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutGameCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imgUrl?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type GameCinema1DaysCreateManyMovieInput = {
    id?: number
    date: Date | string
    createdAt?: Date | string
  }

  export type GameCinema1DaysUpdateWithoutMovieInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tries?: GameCinema1TriesUpdateManyWithoutDayNestedInput
  }

  export type GameCinema1DaysUncheckedUpdateWithoutMovieInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tries?: GameCinema1TriesUncheckedUpdateManyWithoutDayNestedInput
  }

  export type GameCinema1DaysUncheckedUpdateManyWithoutMovieInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesCreateManyDayInput = {
    id?: number
    userId: number
    guess: string
    correct?: boolean
    createdAt?: Date | string
  }

  export type GameCinema1TriesUpdateWithoutDayInput = {
    userId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesUncheckedUpdateWithoutDayInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCinema1TriesUncheckedUpdateManyWithoutDayInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    guess?: StringFieldUpdateOperationsInput | string
    correct?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}