
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectImage
 * 
 */
export type ProjectImage = $Result.DefaultSelection<Prisma.$ProjectImagePayload>
/**
 * Model ProjectLink
 * 
 */
export type ProjectLink = $Result.DefaultSelection<Prisma.$ProjectLinkPayload>
/**
 * Model SoftwareMeta
 * 
 */
export type SoftwareMeta = $Result.DefaultSelection<Prisma.$SoftwareMetaPayload>
/**
 * Model ArtMeta
 * 
 */
export type ArtMeta = $Result.DefaultSelection<Prisma.$ArtMetaPayload>
/**
 * Model DesignMeta
 * 
 */
export type DesignMeta = $Result.DefaultSelection<Prisma.$DesignMetaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  VIEWER: 'VIEWER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Category: {
  WEB_DEV: 'WEB_DEV',
  DESIGN: 'DESIGN',
  FINE_ART: 'FINE_ART'
};

export type Category = (typeof Category)[keyof typeof Category]


export const LinkType: {
  LIVE: 'LIVE',
  REPO: 'REPO',
  SHOP: 'SHOP',
  DEMO: 'DEMO',
  OTHER: 'OTHER'
};

export type LinkType = (typeof LinkType)[keyof typeof LinkType]


export const ArtMedium: {
  PENCIL: 'PENCIL',
  GRAPHITE: 'GRAPHITE',
  BALLPOINT: 'BALLPOINT',
  OIL: 'OIL',
  ACRYLIC: 'ACRYLIC',
  WATERCOLOR: 'WATERCOLOR',
  MIXED_MEDIA: 'MIXED_MEDIA',
  OTHER: 'OTHER'
};

export type ArtMedium = (typeof ArtMedium)[keyof typeof ArtMedium]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Category = $Enums.Category

export const Category: typeof $Enums.Category

export type LinkType = $Enums.LinkType

export const LinkType: typeof $Enums.LinkType

export type ArtMedium = $Enums.ArtMedium

export const ArtMedium: typeof $Enums.ArtMedium

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
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

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
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectImage`: Exposes CRUD operations for the **ProjectImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectImages
    * const projectImages = await prisma.projectImage.findMany()
    * ```
    */
  get projectImage(): Prisma.ProjectImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectLink`: Exposes CRUD operations for the **ProjectLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectLinks
    * const projectLinks = await prisma.projectLink.findMany()
    * ```
    */
  get projectLink(): Prisma.ProjectLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.softwareMeta`: Exposes CRUD operations for the **SoftwareMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SoftwareMetas
    * const softwareMetas = await prisma.softwareMeta.findMany()
    * ```
    */
  get softwareMeta(): Prisma.SoftwareMetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artMeta`: Exposes CRUD operations for the **ArtMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArtMetas
    * const artMetas = await prisma.artMeta.findMany()
    * ```
    */
  get artMeta(): Prisma.ArtMetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designMeta`: Exposes CRUD operations for the **DesignMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignMetas
    * const designMetas = await prisma.designMeta.findMany()
    * ```
    */
  get designMeta(): Prisma.DesignMetaDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Project: 'Project',
    ProjectImage: 'ProjectImage',
    ProjectLink: 'ProjectLink',
    SoftwareMeta: 'SoftwareMeta',
    ArtMeta: 'ArtMeta',
    DesignMeta: 'DesignMeta'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "projectImage" | "projectLink" | "softwareMeta" | "artMeta" | "designMeta"
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
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectImage: {
        payload: Prisma.$ProjectImagePayload<ExtArgs>
        fields: Prisma.ProjectImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          findFirst: {
            args: Prisma.ProjectImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          findMany: {
            args: Prisma.ProjectImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>[]
          }
          create: {
            args: Prisma.ProjectImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          createMany: {
            args: Prisma.ProjectImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>[]
          }
          delete: {
            args: Prisma.ProjectImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          update: {
            args: Prisma.ProjectImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          deleteMany: {
            args: Prisma.ProjectImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>[]
          }
          upsert: {
            args: Prisma.ProjectImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectImagePayload>
          }
          aggregate: {
            args: Prisma.ProjectImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectImage>
          }
          groupBy: {
            args: Prisma.ProjectImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectImageCountAggregateOutputType> | number
          }
        }
      }
      ProjectLink: {
        payload: Prisma.$ProjectLinkPayload<ExtArgs>
        fields: Prisma.ProjectLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          findFirst: {
            args: Prisma.ProjectLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          findMany: {
            args: Prisma.ProjectLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[]
          }
          create: {
            args: Prisma.ProjectLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          createMany: {
            args: Prisma.ProjectLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[]
          }
          delete: {
            args: Prisma.ProjectLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          update: {
            args: Prisma.ProjectLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          deleteMany: {
            args: Prisma.ProjectLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[]
          }
          upsert: {
            args: Prisma.ProjectLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectLinkPayload>
          }
          aggregate: {
            args: Prisma.ProjectLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectLink>
          }
          groupBy: {
            args: Prisma.ProjectLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectLinkCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectLinkCountAggregateOutputType> | number
          }
        }
      }
      SoftwareMeta: {
        payload: Prisma.$SoftwareMetaPayload<ExtArgs>
        fields: Prisma.SoftwareMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SoftwareMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SoftwareMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          findFirst: {
            args: Prisma.SoftwareMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SoftwareMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          findMany: {
            args: Prisma.SoftwareMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>[]
          }
          create: {
            args: Prisma.SoftwareMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          createMany: {
            args: Prisma.SoftwareMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SoftwareMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>[]
          }
          delete: {
            args: Prisma.SoftwareMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          update: {
            args: Prisma.SoftwareMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          deleteMany: {
            args: Prisma.SoftwareMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SoftwareMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SoftwareMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>[]
          }
          upsert: {
            args: Prisma.SoftwareMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoftwareMetaPayload>
          }
          aggregate: {
            args: Prisma.SoftwareMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoftwareMeta>
          }
          groupBy: {
            args: Prisma.SoftwareMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoftwareMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SoftwareMetaCountArgs<ExtArgs>
            result: $Utils.Optional<SoftwareMetaCountAggregateOutputType> | number
          }
        }
      }
      ArtMeta: {
        payload: Prisma.$ArtMetaPayload<ExtArgs>
        fields: Prisma.ArtMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          findFirst: {
            args: Prisma.ArtMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          findMany: {
            args: Prisma.ArtMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>[]
          }
          create: {
            args: Prisma.ArtMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          createMany: {
            args: Prisma.ArtMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>[]
          }
          delete: {
            args: Prisma.ArtMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          update: {
            args: Prisma.ArtMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          deleteMany: {
            args: Prisma.ArtMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>[]
          }
          upsert: {
            args: Prisma.ArtMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtMetaPayload>
          }
          aggregate: {
            args: Prisma.ArtMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtMeta>
          }
          groupBy: {
            args: Prisma.ArtMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtMetaCountArgs<ExtArgs>
            result: $Utils.Optional<ArtMetaCountAggregateOutputType> | number
          }
        }
      }
      DesignMeta: {
        payload: Prisma.$DesignMetaPayload<ExtArgs>
        fields: Prisma.DesignMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          findFirst: {
            args: Prisma.DesignMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          findMany: {
            args: Prisma.DesignMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>[]
          }
          create: {
            args: Prisma.DesignMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          createMany: {
            args: Prisma.DesignMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>[]
          }
          delete: {
            args: Prisma.DesignMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          update: {
            args: Prisma.DesignMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          deleteMany: {
            args: Prisma.DesignMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>[]
          }
          upsert: {
            args: Prisma.DesignMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignMetaPayload>
          }
          aggregate: {
            args: Prisma.DesignMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignMeta>
          }
          groupBy: {
            args: Prisma.DesignMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignMetaCountArgs<ExtArgs>
            result: $Utils.Optional<DesignMetaCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    projectImage?: ProjectImageOmit
    projectLink?: ProjectLinkOmit
    softwareMeta?: SoftwareMetaOmit
    artMeta?: ArtMetaOmit
    designMeta?: DesignMetaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    images: number
    links: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProjectCountOutputTypeCountImagesArgs
    links?: boolean | ProjectCountOutputTypeCountLinksArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectImageWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectLinkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    category: $Enums.Category | null
    description: string | null
    displayOrder: number | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    category: $Enums.Category | null
    description: string | null
    displayOrder: number | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    category: number
    description: number
    tags: number
    displayOrder: number
    featured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectSumAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    category?: true
    description?: true
    displayOrder?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    category?: true
    description?: true
    displayOrder?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    category?: true
    description?: true
    tags?: true
    displayOrder?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    category: $Enums.Category
    description: string | null
    tags: string[]
    displayOrder: number
    featured: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    tags?: boolean
    displayOrder?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    images?: boolean | Project$imagesArgs<ExtArgs>
    links?: boolean | Project$linksArgs<ExtArgs>
    softwareMeta?: boolean | Project$softwareMetaArgs<ExtArgs>
    artMeta?: boolean | Project$artMetaArgs<ExtArgs>
    designMeta?: boolean | Project$designMetaArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    tags?: boolean
    displayOrder?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    tags?: boolean
    displayOrder?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    category?: boolean
    description?: boolean
    tags?: boolean
    displayOrder?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "category" | "description" | "tags" | "displayOrder" | "featured" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Project$imagesArgs<ExtArgs>
    links?: boolean | Project$linksArgs<ExtArgs>
    softwareMeta?: boolean | Project$softwareMetaArgs<ExtArgs>
    artMeta?: boolean | Project$artMetaArgs<ExtArgs>
    designMeta?: boolean | Project$designMetaArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      images: Prisma.$ProjectImagePayload<ExtArgs>[]
      links: Prisma.$ProjectLinkPayload<ExtArgs>[]
      softwareMeta: Prisma.$SoftwareMetaPayload<ExtArgs> | null
      artMeta: Prisma.$ArtMetaPayload<ExtArgs> | null
      designMeta: Prisma.$DesignMetaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      category: $Enums.Category
      description: string | null
      tags: string[]
      displayOrder: number
      featured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Project$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    links<T extends Project$linksArgs<ExtArgs> = {}>(args?: Subset<T, Project$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    softwareMeta<T extends Project$softwareMetaArgs<ExtArgs> = {}>(args?: Subset<T, Project$softwareMetaArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    artMeta<T extends Project$artMetaArgs<ExtArgs> = {}>(args?: Subset<T, Project$artMetaArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    designMeta<T extends Project$designMetaArgs<ExtArgs> = {}>(args?: Subset<T, Project$designMetaArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly category: FieldRef<"Project", 'Category'>
    readonly description: FieldRef<"Project", 'String'>
    readonly tags: FieldRef<"Project", 'String[]'>
    readonly displayOrder: FieldRef<"Project", 'Int'>
    readonly featured: FieldRef<"Project", 'Boolean'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.images
   */
  export type Project$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    where?: ProjectImageWhereInput
    orderBy?: ProjectImageOrderByWithRelationInput | ProjectImageOrderByWithRelationInput[]
    cursor?: ProjectImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectImageScalarFieldEnum | ProjectImageScalarFieldEnum[]
  }

  /**
   * Project.links
   */
  export type Project$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    where?: ProjectLinkWhereInput
    orderBy?: ProjectLinkOrderByWithRelationInput | ProjectLinkOrderByWithRelationInput[]
    cursor?: ProjectLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectLinkScalarFieldEnum | ProjectLinkScalarFieldEnum[]
  }

  /**
   * Project.softwareMeta
   */
  export type Project$softwareMetaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    where?: SoftwareMetaWhereInput
  }

  /**
   * Project.artMeta
   */
  export type Project$artMetaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    where?: ArtMetaWhereInput
  }

  /**
   * Project.designMeta
   */
  export type Project$designMetaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    where?: DesignMetaWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectImage
   */

  export type AggregateProjectImage = {
    _count: ProjectImageCountAggregateOutputType | null
    _avg: ProjectImageAvgAggregateOutputType | null
    _sum: ProjectImageSumAggregateOutputType | null
    _min: ProjectImageMinAggregateOutputType | null
    _max: ProjectImageMaxAggregateOutputType | null
  }

  export type ProjectImageAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectImageSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectImageMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    imageUrl: string | null
    altText: string | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ProjectImageMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    imageUrl: string | null
    altText: string | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ProjectImageCountAggregateOutputType = {
    id: number
    projectId: number
    imageUrl: number
    altText: number
    displayOrder: number
    createdAt: number
    _all: number
  }


  export type ProjectImageAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectImageSumAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectImageMinAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    altText?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ProjectImageMaxAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    altText?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ProjectImageCountAggregateInputType = {
    id?: true
    projectId?: true
    imageUrl?: true
    altText?: true
    displayOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectImage to aggregate.
     */
    where?: ProjectImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectImages to fetch.
     */
    orderBy?: ProjectImageOrderByWithRelationInput | ProjectImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectImages
    **/
    _count?: true | ProjectImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectImageMaxAggregateInputType
  }

  export type GetProjectImageAggregateType<T extends ProjectImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectImage[P]>
      : GetScalarType<T[P], AggregateProjectImage[P]>
  }




  export type ProjectImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectImageWhereInput
    orderBy?: ProjectImageOrderByWithAggregationInput | ProjectImageOrderByWithAggregationInput[]
    by: ProjectImageScalarFieldEnum[] | ProjectImageScalarFieldEnum
    having?: ProjectImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectImageCountAggregateInputType | true
    _avg?: ProjectImageAvgAggregateInputType
    _sum?: ProjectImageSumAggregateInputType
    _min?: ProjectImageMinAggregateInputType
    _max?: ProjectImageMaxAggregateInputType
  }

  export type ProjectImageGroupByOutputType = {
    id: string
    projectId: string
    imageUrl: string
    altText: string | null
    displayOrder: number
    createdAt: Date
    _count: ProjectImageCountAggregateOutputType | null
    _avg: ProjectImageAvgAggregateOutputType | null
    _sum: ProjectImageSumAggregateOutputType | null
    _min: ProjectImageMinAggregateOutputType | null
    _max: ProjectImageMaxAggregateOutputType | null
  }

  type GetProjectImageGroupByPayload<T extends ProjectImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectImageGroupByOutputType[P]>
        }
      >
    >


  export type ProjectImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    altText?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectImage"]>

  export type ProjectImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    altText?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectImage"]>

  export type ProjectImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    altText?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectImage"]>

  export type ProjectImageSelectScalar = {
    id?: boolean
    projectId?: boolean
    imageUrl?: boolean
    altText?: boolean
    displayOrder?: boolean
    createdAt?: boolean
  }

  export type ProjectImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "imageUrl" | "altText" | "displayOrder" | "createdAt", ExtArgs["result"]["projectImage"]>
  export type ProjectImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectImage"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      imageUrl: string
      altText: string | null
      displayOrder: number
      createdAt: Date
    }, ExtArgs["result"]["projectImage"]>
    composites: {}
  }

  type ProjectImageGetPayload<S extends boolean | null | undefined | ProjectImageDefaultArgs> = $Result.GetResult<Prisma.$ProjectImagePayload, S>

  type ProjectImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectImageCountAggregateInputType | true
    }

  export interface ProjectImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectImage'], meta: { name: 'ProjectImage' } }
    /**
     * Find zero or one ProjectImage that matches the filter.
     * @param {ProjectImageFindUniqueArgs} args - Arguments to find a ProjectImage
     * @example
     * // Get one ProjectImage
     * const projectImage = await prisma.projectImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectImageFindUniqueArgs>(args: SelectSubset<T, ProjectImageFindUniqueArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectImageFindUniqueOrThrowArgs} args - Arguments to find a ProjectImage
     * @example
     * // Get one ProjectImage
     * const projectImage = await prisma.projectImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageFindFirstArgs} args - Arguments to find a ProjectImage
     * @example
     * // Get one ProjectImage
     * const projectImage = await prisma.projectImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectImageFindFirstArgs>(args?: SelectSubset<T, ProjectImageFindFirstArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageFindFirstOrThrowArgs} args - Arguments to find a ProjectImage
     * @example
     * // Get one ProjectImage
     * const projectImage = await prisma.projectImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectImages
     * const projectImages = await prisma.projectImage.findMany()
     * 
     * // Get first 10 ProjectImages
     * const projectImages = await prisma.projectImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectImageWithIdOnly = await prisma.projectImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectImageFindManyArgs>(args?: SelectSubset<T, ProjectImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectImage.
     * @param {ProjectImageCreateArgs} args - Arguments to create a ProjectImage.
     * @example
     * // Create one ProjectImage
     * const ProjectImage = await prisma.projectImage.create({
     *   data: {
     *     // ... data to create a ProjectImage
     *   }
     * })
     * 
     */
    create<T extends ProjectImageCreateArgs>(args: SelectSubset<T, ProjectImageCreateArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectImages.
     * @param {ProjectImageCreateManyArgs} args - Arguments to create many ProjectImages.
     * @example
     * // Create many ProjectImages
     * const projectImage = await prisma.projectImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectImageCreateManyArgs>(args?: SelectSubset<T, ProjectImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectImages and returns the data saved in the database.
     * @param {ProjectImageCreateManyAndReturnArgs} args - Arguments to create many ProjectImages.
     * @example
     * // Create many ProjectImages
     * const projectImage = await prisma.projectImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectImages and only return the `id`
     * const projectImageWithIdOnly = await prisma.projectImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectImage.
     * @param {ProjectImageDeleteArgs} args - Arguments to delete one ProjectImage.
     * @example
     * // Delete one ProjectImage
     * const ProjectImage = await prisma.projectImage.delete({
     *   where: {
     *     // ... filter to delete one ProjectImage
     *   }
     * })
     * 
     */
    delete<T extends ProjectImageDeleteArgs>(args: SelectSubset<T, ProjectImageDeleteArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectImage.
     * @param {ProjectImageUpdateArgs} args - Arguments to update one ProjectImage.
     * @example
     * // Update one ProjectImage
     * const projectImage = await prisma.projectImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectImageUpdateArgs>(args: SelectSubset<T, ProjectImageUpdateArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectImages.
     * @param {ProjectImageDeleteManyArgs} args - Arguments to filter ProjectImages to delete.
     * @example
     * // Delete a few ProjectImages
     * const { count } = await prisma.projectImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectImageDeleteManyArgs>(args?: SelectSubset<T, ProjectImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectImages
     * const projectImage = await prisma.projectImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectImageUpdateManyArgs>(args: SelectSubset<T, ProjectImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectImages and returns the data updated in the database.
     * @param {ProjectImageUpdateManyAndReturnArgs} args - Arguments to update many ProjectImages.
     * @example
     * // Update many ProjectImages
     * const projectImage = await prisma.projectImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectImages and only return the `id`
     * const projectImageWithIdOnly = await prisma.projectImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectImage.
     * @param {ProjectImageUpsertArgs} args - Arguments to update or create a ProjectImage.
     * @example
     * // Update or create a ProjectImage
     * const projectImage = await prisma.projectImage.upsert({
     *   create: {
     *     // ... data to create a ProjectImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectImage we want to update
     *   }
     * })
     */
    upsert<T extends ProjectImageUpsertArgs>(args: SelectSubset<T, ProjectImageUpsertArgs<ExtArgs>>): Prisma__ProjectImageClient<$Result.GetResult<Prisma.$ProjectImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageCountArgs} args - Arguments to filter ProjectImages to count.
     * @example
     * // Count the number of ProjectImages
     * const count = await prisma.projectImage.count({
     *   where: {
     *     // ... the filter for the ProjectImages we want to count
     *   }
     * })
    **/
    count<T extends ProjectImageCountArgs>(
      args?: Subset<T, ProjectImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectImageAggregateArgs>(args: Subset<T, ProjectImageAggregateArgs>): Prisma.PrismaPromise<GetProjectImageAggregateType<T>>

    /**
     * Group by ProjectImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectImageGroupByArgs} args - Group by arguments.
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
      T extends ProjectImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectImageGroupByArgs['orderBy'] }
        : { orderBy?: ProjectImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectImage model
   */
  readonly fields: ProjectImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProjectImage model
   */
  interface ProjectImageFieldRefs {
    readonly id: FieldRef<"ProjectImage", 'String'>
    readonly projectId: FieldRef<"ProjectImage", 'String'>
    readonly imageUrl: FieldRef<"ProjectImage", 'String'>
    readonly altText: FieldRef<"ProjectImage", 'String'>
    readonly displayOrder: FieldRef<"ProjectImage", 'Int'>
    readonly createdAt: FieldRef<"ProjectImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectImage findUnique
   */
  export type ProjectImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectImage to fetch.
     */
    where: ProjectImageWhereUniqueInput
  }

  /**
   * ProjectImage findUniqueOrThrow
   */
  export type ProjectImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectImage to fetch.
     */
    where: ProjectImageWhereUniqueInput
  }

  /**
   * ProjectImage findFirst
   */
  export type ProjectImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectImage to fetch.
     */
    where?: ProjectImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectImages to fetch.
     */
    orderBy?: ProjectImageOrderByWithRelationInput | ProjectImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectImages.
     */
    cursor?: ProjectImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectImages.
     */
    distinct?: ProjectImageScalarFieldEnum | ProjectImageScalarFieldEnum[]
  }

  /**
   * ProjectImage findFirstOrThrow
   */
  export type ProjectImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectImage to fetch.
     */
    where?: ProjectImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectImages to fetch.
     */
    orderBy?: ProjectImageOrderByWithRelationInput | ProjectImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectImages.
     */
    cursor?: ProjectImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectImages.
     */
    distinct?: ProjectImageScalarFieldEnum | ProjectImageScalarFieldEnum[]
  }

  /**
   * ProjectImage findMany
   */
  export type ProjectImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter, which ProjectImages to fetch.
     */
    where?: ProjectImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectImages to fetch.
     */
    orderBy?: ProjectImageOrderByWithRelationInput | ProjectImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectImages.
     */
    cursor?: ProjectImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectImages.
     */
    skip?: number
    distinct?: ProjectImageScalarFieldEnum | ProjectImageScalarFieldEnum[]
  }

  /**
   * ProjectImage create
   */
  export type ProjectImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectImage.
     */
    data: XOR<ProjectImageCreateInput, ProjectImageUncheckedCreateInput>
  }

  /**
   * ProjectImage createMany
   */
  export type ProjectImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectImages.
     */
    data: ProjectImageCreateManyInput | ProjectImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectImage createManyAndReturn
   */
  export type ProjectImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectImages.
     */
    data: ProjectImageCreateManyInput | ProjectImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectImage update
   */
  export type ProjectImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectImage.
     */
    data: XOR<ProjectImageUpdateInput, ProjectImageUncheckedUpdateInput>
    /**
     * Choose, which ProjectImage to update.
     */
    where: ProjectImageWhereUniqueInput
  }

  /**
   * ProjectImage updateMany
   */
  export type ProjectImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectImages.
     */
    data: XOR<ProjectImageUpdateManyMutationInput, ProjectImageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectImages to update
     */
    where?: ProjectImageWhereInput
    /**
     * Limit how many ProjectImages to update.
     */
    limit?: number
  }

  /**
   * ProjectImage updateManyAndReturn
   */
  export type ProjectImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * The data used to update ProjectImages.
     */
    data: XOR<ProjectImageUpdateManyMutationInput, ProjectImageUncheckedUpdateManyInput>
    /**
     * Filter which ProjectImages to update
     */
    where?: ProjectImageWhereInput
    /**
     * Limit how many ProjectImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectImage upsert
   */
  export type ProjectImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectImage to update in case it exists.
     */
    where: ProjectImageWhereUniqueInput
    /**
     * In case the ProjectImage found by the `where` argument doesn't exist, create a new ProjectImage with this data.
     */
    create: XOR<ProjectImageCreateInput, ProjectImageUncheckedCreateInput>
    /**
     * In case the ProjectImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectImageUpdateInput, ProjectImageUncheckedUpdateInput>
  }

  /**
   * ProjectImage delete
   */
  export type ProjectImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
    /**
     * Filter which ProjectImage to delete.
     */
    where: ProjectImageWhereUniqueInput
  }

  /**
   * ProjectImage deleteMany
   */
  export type ProjectImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectImages to delete
     */
    where?: ProjectImageWhereInput
    /**
     * Limit how many ProjectImages to delete.
     */
    limit?: number
  }

  /**
   * ProjectImage without action
   */
  export type ProjectImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectImage
     */
    select?: ProjectImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectImage
     */
    omit?: ProjectImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectImageInclude<ExtArgs> | null
  }


  /**
   * Model ProjectLink
   */

  export type AggregateProjectLink = {
    _count: ProjectLinkCountAggregateOutputType | null
    _avg: ProjectLinkAvgAggregateOutputType | null
    _sum: ProjectLinkSumAggregateOutputType | null
    _min: ProjectLinkMinAggregateOutputType | null
    _max: ProjectLinkMaxAggregateOutputType | null
  }

  export type ProjectLinkAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectLinkSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProjectLinkMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    label: string | null
    url: string | null
    linkType: $Enums.LinkType | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ProjectLinkMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    label: string | null
    url: string | null
    linkType: $Enums.LinkType | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ProjectLinkCountAggregateOutputType = {
    id: number
    projectId: number
    label: number
    url: number
    linkType: number
    displayOrder: number
    createdAt: number
    _all: number
  }


  export type ProjectLinkAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectLinkSumAggregateInputType = {
    displayOrder?: true
  }

  export type ProjectLinkMinAggregateInputType = {
    id?: true
    projectId?: true
    label?: true
    url?: true
    linkType?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ProjectLinkMaxAggregateInputType = {
    id?: true
    projectId?: true
    label?: true
    url?: true
    linkType?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ProjectLinkCountAggregateInputType = {
    id?: true
    projectId?: true
    label?: true
    url?: true
    linkType?: true
    displayOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectLink to aggregate.
     */
    where?: ProjectLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectLinks to fetch.
     */
    orderBy?: ProjectLinkOrderByWithRelationInput | ProjectLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectLinks
    **/
    _count?: true | ProjectLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectLinkMaxAggregateInputType
  }

  export type GetProjectLinkAggregateType<T extends ProjectLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectLink[P]>
      : GetScalarType<T[P], AggregateProjectLink[P]>
  }




  export type ProjectLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectLinkWhereInput
    orderBy?: ProjectLinkOrderByWithAggregationInput | ProjectLinkOrderByWithAggregationInput[]
    by: ProjectLinkScalarFieldEnum[] | ProjectLinkScalarFieldEnum
    having?: ProjectLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectLinkCountAggregateInputType | true
    _avg?: ProjectLinkAvgAggregateInputType
    _sum?: ProjectLinkSumAggregateInputType
    _min?: ProjectLinkMinAggregateInputType
    _max?: ProjectLinkMaxAggregateInputType
  }

  export type ProjectLinkGroupByOutputType = {
    id: string
    projectId: string
    label: string
    url: string
    linkType: $Enums.LinkType
    displayOrder: number
    createdAt: Date
    _count: ProjectLinkCountAggregateOutputType | null
    _avg: ProjectLinkAvgAggregateOutputType | null
    _sum: ProjectLinkSumAggregateOutputType | null
    _min: ProjectLinkMinAggregateOutputType | null
    _max: ProjectLinkMaxAggregateOutputType | null
  }

  type GetProjectLinkGroupByPayload<T extends ProjectLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectLinkGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectLinkGroupByOutputType[P]>
        }
      >
    >


  export type ProjectLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    label?: boolean
    url?: boolean
    linkType?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectLink"]>

  export type ProjectLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    label?: boolean
    url?: boolean
    linkType?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectLink"]>

  export type ProjectLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    label?: boolean
    url?: boolean
    linkType?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectLink"]>

  export type ProjectLinkSelectScalar = {
    id?: boolean
    projectId?: boolean
    label?: boolean
    url?: boolean
    linkType?: boolean
    displayOrder?: boolean
    createdAt?: boolean
  }

  export type ProjectLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "label" | "url" | "linkType" | "displayOrder" | "createdAt", ExtArgs["result"]["projectLink"]>
  export type ProjectLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectLink"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      label: string
      url: string
      linkType: $Enums.LinkType
      displayOrder: number
      createdAt: Date
    }, ExtArgs["result"]["projectLink"]>
    composites: {}
  }

  type ProjectLinkGetPayload<S extends boolean | null | undefined | ProjectLinkDefaultArgs> = $Result.GetResult<Prisma.$ProjectLinkPayload, S>

  type ProjectLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectLinkCountAggregateInputType | true
    }

  export interface ProjectLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectLink'], meta: { name: 'ProjectLink' } }
    /**
     * Find zero or one ProjectLink that matches the filter.
     * @param {ProjectLinkFindUniqueArgs} args - Arguments to find a ProjectLink
     * @example
     * // Get one ProjectLink
     * const projectLink = await prisma.projectLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectLinkFindUniqueArgs>(args: SelectSubset<T, ProjectLinkFindUniqueArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectLinkFindUniqueOrThrowArgs} args - Arguments to find a ProjectLink
     * @example
     * // Get one ProjectLink
     * const projectLink = await prisma.projectLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkFindFirstArgs} args - Arguments to find a ProjectLink
     * @example
     * // Get one ProjectLink
     * const projectLink = await prisma.projectLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectLinkFindFirstArgs>(args?: SelectSubset<T, ProjectLinkFindFirstArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkFindFirstOrThrowArgs} args - Arguments to find a ProjectLink
     * @example
     * // Get one ProjectLink
     * const projectLink = await prisma.projectLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectLinks
     * const projectLinks = await prisma.projectLink.findMany()
     * 
     * // Get first 10 ProjectLinks
     * const projectLinks = await prisma.projectLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectLinkWithIdOnly = await prisma.projectLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectLinkFindManyArgs>(args?: SelectSubset<T, ProjectLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectLink.
     * @param {ProjectLinkCreateArgs} args - Arguments to create a ProjectLink.
     * @example
     * // Create one ProjectLink
     * const ProjectLink = await prisma.projectLink.create({
     *   data: {
     *     // ... data to create a ProjectLink
     *   }
     * })
     * 
     */
    create<T extends ProjectLinkCreateArgs>(args: SelectSubset<T, ProjectLinkCreateArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectLinks.
     * @param {ProjectLinkCreateManyArgs} args - Arguments to create many ProjectLinks.
     * @example
     * // Create many ProjectLinks
     * const projectLink = await prisma.projectLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectLinkCreateManyArgs>(args?: SelectSubset<T, ProjectLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectLinks and returns the data saved in the database.
     * @param {ProjectLinkCreateManyAndReturnArgs} args - Arguments to create many ProjectLinks.
     * @example
     * // Create many ProjectLinks
     * const projectLink = await prisma.projectLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectLinks and only return the `id`
     * const projectLinkWithIdOnly = await prisma.projectLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectLink.
     * @param {ProjectLinkDeleteArgs} args - Arguments to delete one ProjectLink.
     * @example
     * // Delete one ProjectLink
     * const ProjectLink = await prisma.projectLink.delete({
     *   where: {
     *     // ... filter to delete one ProjectLink
     *   }
     * })
     * 
     */
    delete<T extends ProjectLinkDeleteArgs>(args: SelectSubset<T, ProjectLinkDeleteArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectLink.
     * @param {ProjectLinkUpdateArgs} args - Arguments to update one ProjectLink.
     * @example
     * // Update one ProjectLink
     * const projectLink = await prisma.projectLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectLinkUpdateArgs>(args: SelectSubset<T, ProjectLinkUpdateArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectLinks.
     * @param {ProjectLinkDeleteManyArgs} args - Arguments to filter ProjectLinks to delete.
     * @example
     * // Delete a few ProjectLinks
     * const { count } = await prisma.projectLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectLinkDeleteManyArgs>(args?: SelectSubset<T, ProjectLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectLinks
     * const projectLink = await prisma.projectLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectLinkUpdateManyArgs>(args: SelectSubset<T, ProjectLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectLinks and returns the data updated in the database.
     * @param {ProjectLinkUpdateManyAndReturnArgs} args - Arguments to update many ProjectLinks.
     * @example
     * // Update many ProjectLinks
     * const projectLink = await prisma.projectLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectLinks and only return the `id`
     * const projectLinkWithIdOnly = await prisma.projectLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectLink.
     * @param {ProjectLinkUpsertArgs} args - Arguments to update or create a ProjectLink.
     * @example
     * // Update or create a ProjectLink
     * const projectLink = await prisma.projectLink.upsert({
     *   create: {
     *     // ... data to create a ProjectLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectLink we want to update
     *   }
     * })
     */
    upsert<T extends ProjectLinkUpsertArgs>(args: SelectSubset<T, ProjectLinkUpsertArgs<ExtArgs>>): Prisma__ProjectLinkClient<$Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkCountArgs} args - Arguments to filter ProjectLinks to count.
     * @example
     * // Count the number of ProjectLinks
     * const count = await prisma.projectLink.count({
     *   where: {
     *     // ... the filter for the ProjectLinks we want to count
     *   }
     * })
    **/
    count<T extends ProjectLinkCountArgs>(
      args?: Subset<T, ProjectLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectLinkAggregateArgs>(args: Subset<T, ProjectLinkAggregateArgs>): Prisma.PrismaPromise<GetProjectLinkAggregateType<T>>

    /**
     * Group by ProjectLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectLinkGroupByArgs} args - Group by arguments.
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
      T extends ProjectLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectLinkGroupByArgs['orderBy'] }
        : { orderBy?: ProjectLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectLink model
   */
  readonly fields: ProjectLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProjectLink model
   */
  interface ProjectLinkFieldRefs {
    readonly id: FieldRef<"ProjectLink", 'String'>
    readonly projectId: FieldRef<"ProjectLink", 'String'>
    readonly label: FieldRef<"ProjectLink", 'String'>
    readonly url: FieldRef<"ProjectLink", 'String'>
    readonly linkType: FieldRef<"ProjectLink", 'LinkType'>
    readonly displayOrder: FieldRef<"ProjectLink", 'Int'>
    readonly createdAt: FieldRef<"ProjectLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectLink findUnique
   */
  export type ProjectLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter, which ProjectLink to fetch.
     */
    where: ProjectLinkWhereUniqueInput
  }

  /**
   * ProjectLink findUniqueOrThrow
   */
  export type ProjectLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter, which ProjectLink to fetch.
     */
    where: ProjectLinkWhereUniqueInput
  }

  /**
   * ProjectLink findFirst
   */
  export type ProjectLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter, which ProjectLink to fetch.
     */
    where?: ProjectLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectLinks to fetch.
     */
    orderBy?: ProjectLinkOrderByWithRelationInput | ProjectLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectLinks.
     */
    cursor?: ProjectLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectLinks.
     */
    distinct?: ProjectLinkScalarFieldEnum | ProjectLinkScalarFieldEnum[]
  }

  /**
   * ProjectLink findFirstOrThrow
   */
  export type ProjectLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter, which ProjectLink to fetch.
     */
    where?: ProjectLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectLinks to fetch.
     */
    orderBy?: ProjectLinkOrderByWithRelationInput | ProjectLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectLinks.
     */
    cursor?: ProjectLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectLinks.
     */
    distinct?: ProjectLinkScalarFieldEnum | ProjectLinkScalarFieldEnum[]
  }

  /**
   * ProjectLink findMany
   */
  export type ProjectLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter, which ProjectLinks to fetch.
     */
    where?: ProjectLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectLinks to fetch.
     */
    orderBy?: ProjectLinkOrderByWithRelationInput | ProjectLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectLinks.
     */
    cursor?: ProjectLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectLinks.
     */
    skip?: number
    distinct?: ProjectLinkScalarFieldEnum | ProjectLinkScalarFieldEnum[]
  }

  /**
   * ProjectLink create
   */
  export type ProjectLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectLink.
     */
    data: XOR<ProjectLinkCreateInput, ProjectLinkUncheckedCreateInput>
  }

  /**
   * ProjectLink createMany
   */
  export type ProjectLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectLinks.
     */
    data: ProjectLinkCreateManyInput | ProjectLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectLink createManyAndReturn
   */
  export type ProjectLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectLinks.
     */
    data: ProjectLinkCreateManyInput | ProjectLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectLink update
   */
  export type ProjectLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectLink.
     */
    data: XOR<ProjectLinkUpdateInput, ProjectLinkUncheckedUpdateInput>
    /**
     * Choose, which ProjectLink to update.
     */
    where: ProjectLinkWhereUniqueInput
  }

  /**
   * ProjectLink updateMany
   */
  export type ProjectLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectLinks.
     */
    data: XOR<ProjectLinkUpdateManyMutationInput, ProjectLinkUncheckedUpdateManyInput>
    /**
     * Filter which ProjectLinks to update
     */
    where?: ProjectLinkWhereInput
    /**
     * Limit how many ProjectLinks to update.
     */
    limit?: number
  }

  /**
   * ProjectLink updateManyAndReturn
   */
  export type ProjectLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * The data used to update ProjectLinks.
     */
    data: XOR<ProjectLinkUpdateManyMutationInput, ProjectLinkUncheckedUpdateManyInput>
    /**
     * Filter which ProjectLinks to update
     */
    where?: ProjectLinkWhereInput
    /**
     * Limit how many ProjectLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectLink upsert
   */
  export type ProjectLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectLink to update in case it exists.
     */
    where: ProjectLinkWhereUniqueInput
    /**
     * In case the ProjectLink found by the `where` argument doesn't exist, create a new ProjectLink with this data.
     */
    create: XOR<ProjectLinkCreateInput, ProjectLinkUncheckedCreateInput>
    /**
     * In case the ProjectLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectLinkUpdateInput, ProjectLinkUncheckedUpdateInput>
  }

  /**
   * ProjectLink delete
   */
  export type ProjectLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
    /**
     * Filter which ProjectLink to delete.
     */
    where: ProjectLinkWhereUniqueInput
  }

  /**
   * ProjectLink deleteMany
   */
  export type ProjectLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectLinks to delete
     */
    where?: ProjectLinkWhereInput
    /**
     * Limit how many ProjectLinks to delete.
     */
    limit?: number
  }

  /**
   * ProjectLink without action
   */
  export type ProjectLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectLink
     */
    select?: ProjectLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectLink
     */
    omit?: ProjectLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectLinkInclude<ExtArgs> | null
  }


  /**
   * Model SoftwareMeta
   */

  export type AggregateSoftwareMeta = {
    _count: SoftwareMetaCountAggregateOutputType | null
    _avg: SoftwareMetaAvgAggregateOutputType | null
    _sum: SoftwareMetaSumAggregateOutputType | null
    _min: SoftwareMetaMinAggregateOutputType | null
    _max: SoftwareMetaMaxAggregateOutputType | null
  }

  export type SoftwareMetaAvgAggregateOutputType = {
    lighthouseScore: number | null
    pageLoadMs: number | null
    monthlyVisitors: number | null
    uptime: number | null
  }

  export type SoftwareMetaSumAggregateOutputType = {
    lighthouseScore: number | null
    pageLoadMs: number | null
    monthlyVisitors: number | null
    uptime: number | null
  }

  export type SoftwareMetaMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    liveUrl: string | null
    repoUrl: string | null
    lighthouseScore: number | null
    pageLoadMs: number | null
    monthlyVisitors: number | null
    uptime: number | null
    analyticsNote: string | null
    createdAt: Date | null
  }

  export type SoftwareMetaMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    liveUrl: string | null
    repoUrl: string | null
    lighthouseScore: number | null
    pageLoadMs: number | null
    monthlyVisitors: number | null
    uptime: number | null
    analyticsNote: string | null
    createdAt: Date | null
  }

  export type SoftwareMetaCountAggregateOutputType = {
    id: number
    projectId: number
    techStack: number
    liveUrl: number
    repoUrl: number
    lighthouseScore: number
    pageLoadMs: number
    monthlyVisitors: number
    uptime: number
    analyticsNote: number
    createdAt: number
    _all: number
  }


  export type SoftwareMetaAvgAggregateInputType = {
    lighthouseScore?: true
    pageLoadMs?: true
    monthlyVisitors?: true
    uptime?: true
  }

  export type SoftwareMetaSumAggregateInputType = {
    lighthouseScore?: true
    pageLoadMs?: true
    monthlyVisitors?: true
    uptime?: true
  }

  export type SoftwareMetaMinAggregateInputType = {
    id?: true
    projectId?: true
    liveUrl?: true
    repoUrl?: true
    lighthouseScore?: true
    pageLoadMs?: true
    monthlyVisitors?: true
    uptime?: true
    analyticsNote?: true
    createdAt?: true
  }

  export type SoftwareMetaMaxAggregateInputType = {
    id?: true
    projectId?: true
    liveUrl?: true
    repoUrl?: true
    lighthouseScore?: true
    pageLoadMs?: true
    monthlyVisitors?: true
    uptime?: true
    analyticsNote?: true
    createdAt?: true
  }

  export type SoftwareMetaCountAggregateInputType = {
    id?: true
    projectId?: true
    techStack?: true
    liveUrl?: true
    repoUrl?: true
    lighthouseScore?: true
    pageLoadMs?: true
    monthlyVisitors?: true
    uptime?: true
    analyticsNote?: true
    createdAt?: true
    _all?: true
  }

  export type SoftwareMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoftwareMeta to aggregate.
     */
    where?: SoftwareMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoftwareMetas to fetch.
     */
    orderBy?: SoftwareMetaOrderByWithRelationInput | SoftwareMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SoftwareMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoftwareMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoftwareMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SoftwareMetas
    **/
    _count?: true | SoftwareMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoftwareMetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoftwareMetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoftwareMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoftwareMetaMaxAggregateInputType
  }

  export type GetSoftwareMetaAggregateType<T extends SoftwareMetaAggregateArgs> = {
        [P in keyof T & keyof AggregateSoftwareMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoftwareMeta[P]>
      : GetScalarType<T[P], AggregateSoftwareMeta[P]>
  }




  export type SoftwareMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoftwareMetaWhereInput
    orderBy?: SoftwareMetaOrderByWithAggregationInput | SoftwareMetaOrderByWithAggregationInput[]
    by: SoftwareMetaScalarFieldEnum[] | SoftwareMetaScalarFieldEnum
    having?: SoftwareMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoftwareMetaCountAggregateInputType | true
    _avg?: SoftwareMetaAvgAggregateInputType
    _sum?: SoftwareMetaSumAggregateInputType
    _min?: SoftwareMetaMinAggregateInputType
    _max?: SoftwareMetaMaxAggregateInputType
  }

  export type SoftwareMetaGroupByOutputType = {
    id: string
    projectId: string
    techStack: string[]
    liveUrl: string | null
    repoUrl: string | null
    lighthouseScore: number | null
    pageLoadMs: number | null
    monthlyVisitors: number | null
    uptime: number | null
    analyticsNote: string | null
    createdAt: Date
    _count: SoftwareMetaCountAggregateOutputType | null
    _avg: SoftwareMetaAvgAggregateOutputType | null
    _sum: SoftwareMetaSumAggregateOutputType | null
    _min: SoftwareMetaMinAggregateOutputType | null
    _max: SoftwareMetaMaxAggregateOutputType | null
  }

  type GetSoftwareMetaGroupByPayload<T extends SoftwareMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoftwareMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoftwareMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoftwareMetaGroupByOutputType[P]>
            : GetScalarType<T[P], SoftwareMetaGroupByOutputType[P]>
        }
      >
    >


  export type SoftwareMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    techStack?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    lighthouseScore?: boolean
    pageLoadMs?: boolean
    monthlyVisitors?: boolean
    uptime?: boolean
    analyticsNote?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["softwareMeta"]>

  export type SoftwareMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    techStack?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    lighthouseScore?: boolean
    pageLoadMs?: boolean
    monthlyVisitors?: boolean
    uptime?: boolean
    analyticsNote?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["softwareMeta"]>

  export type SoftwareMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    techStack?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    lighthouseScore?: boolean
    pageLoadMs?: boolean
    monthlyVisitors?: boolean
    uptime?: boolean
    analyticsNote?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["softwareMeta"]>

  export type SoftwareMetaSelectScalar = {
    id?: boolean
    projectId?: boolean
    techStack?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    lighthouseScore?: boolean
    pageLoadMs?: boolean
    monthlyVisitors?: boolean
    uptime?: boolean
    analyticsNote?: boolean
    createdAt?: boolean
  }

  export type SoftwareMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "techStack" | "liveUrl" | "repoUrl" | "lighthouseScore" | "pageLoadMs" | "monthlyVisitors" | "uptime" | "analyticsNote" | "createdAt", ExtArgs["result"]["softwareMeta"]>
  export type SoftwareMetaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SoftwareMetaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type SoftwareMetaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $SoftwareMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SoftwareMeta"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      techStack: string[]
      liveUrl: string | null
      repoUrl: string | null
      lighthouseScore: number | null
      pageLoadMs: number | null
      monthlyVisitors: number | null
      uptime: number | null
      analyticsNote: string | null
      createdAt: Date
    }, ExtArgs["result"]["softwareMeta"]>
    composites: {}
  }

  type SoftwareMetaGetPayload<S extends boolean | null | undefined | SoftwareMetaDefaultArgs> = $Result.GetResult<Prisma.$SoftwareMetaPayload, S>

  type SoftwareMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SoftwareMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoftwareMetaCountAggregateInputType | true
    }

  export interface SoftwareMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SoftwareMeta'], meta: { name: 'SoftwareMeta' } }
    /**
     * Find zero or one SoftwareMeta that matches the filter.
     * @param {SoftwareMetaFindUniqueArgs} args - Arguments to find a SoftwareMeta
     * @example
     * // Get one SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoftwareMetaFindUniqueArgs>(args: SelectSubset<T, SoftwareMetaFindUniqueArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SoftwareMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoftwareMetaFindUniqueOrThrowArgs} args - Arguments to find a SoftwareMeta
     * @example
     * // Get one SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoftwareMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, SoftwareMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoftwareMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaFindFirstArgs} args - Arguments to find a SoftwareMeta
     * @example
     * // Get one SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoftwareMetaFindFirstArgs>(args?: SelectSubset<T, SoftwareMetaFindFirstArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoftwareMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaFindFirstOrThrowArgs} args - Arguments to find a SoftwareMeta
     * @example
     * // Get one SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoftwareMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, SoftwareMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoftwareMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoftwareMetas
     * const softwareMetas = await prisma.softwareMeta.findMany()
     * 
     * // Get first 10 SoftwareMetas
     * const softwareMetas = await prisma.softwareMeta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const softwareMetaWithIdOnly = await prisma.softwareMeta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SoftwareMetaFindManyArgs>(args?: SelectSubset<T, SoftwareMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SoftwareMeta.
     * @param {SoftwareMetaCreateArgs} args - Arguments to create a SoftwareMeta.
     * @example
     * // Create one SoftwareMeta
     * const SoftwareMeta = await prisma.softwareMeta.create({
     *   data: {
     *     // ... data to create a SoftwareMeta
     *   }
     * })
     * 
     */
    create<T extends SoftwareMetaCreateArgs>(args: SelectSubset<T, SoftwareMetaCreateArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SoftwareMetas.
     * @param {SoftwareMetaCreateManyArgs} args - Arguments to create many SoftwareMetas.
     * @example
     * // Create many SoftwareMetas
     * const softwareMeta = await prisma.softwareMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SoftwareMetaCreateManyArgs>(args?: SelectSubset<T, SoftwareMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SoftwareMetas and returns the data saved in the database.
     * @param {SoftwareMetaCreateManyAndReturnArgs} args - Arguments to create many SoftwareMetas.
     * @example
     * // Create many SoftwareMetas
     * const softwareMeta = await prisma.softwareMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SoftwareMetas and only return the `id`
     * const softwareMetaWithIdOnly = await prisma.softwareMeta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SoftwareMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, SoftwareMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SoftwareMeta.
     * @param {SoftwareMetaDeleteArgs} args - Arguments to delete one SoftwareMeta.
     * @example
     * // Delete one SoftwareMeta
     * const SoftwareMeta = await prisma.softwareMeta.delete({
     *   where: {
     *     // ... filter to delete one SoftwareMeta
     *   }
     * })
     * 
     */
    delete<T extends SoftwareMetaDeleteArgs>(args: SelectSubset<T, SoftwareMetaDeleteArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SoftwareMeta.
     * @param {SoftwareMetaUpdateArgs} args - Arguments to update one SoftwareMeta.
     * @example
     * // Update one SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SoftwareMetaUpdateArgs>(args: SelectSubset<T, SoftwareMetaUpdateArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SoftwareMetas.
     * @param {SoftwareMetaDeleteManyArgs} args - Arguments to filter SoftwareMetas to delete.
     * @example
     * // Delete a few SoftwareMetas
     * const { count } = await prisma.softwareMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SoftwareMetaDeleteManyArgs>(args?: SelectSubset<T, SoftwareMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoftwareMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoftwareMetas
     * const softwareMeta = await prisma.softwareMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SoftwareMetaUpdateManyArgs>(args: SelectSubset<T, SoftwareMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoftwareMetas and returns the data updated in the database.
     * @param {SoftwareMetaUpdateManyAndReturnArgs} args - Arguments to update many SoftwareMetas.
     * @example
     * // Update many SoftwareMetas
     * const softwareMeta = await prisma.softwareMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SoftwareMetas and only return the `id`
     * const softwareMetaWithIdOnly = await prisma.softwareMeta.updateManyAndReturn({
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
    updateManyAndReturn<T extends SoftwareMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, SoftwareMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SoftwareMeta.
     * @param {SoftwareMetaUpsertArgs} args - Arguments to update or create a SoftwareMeta.
     * @example
     * // Update or create a SoftwareMeta
     * const softwareMeta = await prisma.softwareMeta.upsert({
     *   create: {
     *     // ... data to create a SoftwareMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoftwareMeta we want to update
     *   }
     * })
     */
    upsert<T extends SoftwareMetaUpsertArgs>(args: SelectSubset<T, SoftwareMetaUpsertArgs<ExtArgs>>): Prisma__SoftwareMetaClient<$Result.GetResult<Prisma.$SoftwareMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SoftwareMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaCountArgs} args - Arguments to filter SoftwareMetas to count.
     * @example
     * // Count the number of SoftwareMetas
     * const count = await prisma.softwareMeta.count({
     *   where: {
     *     // ... the filter for the SoftwareMetas we want to count
     *   }
     * })
    **/
    count<T extends SoftwareMetaCountArgs>(
      args?: Subset<T, SoftwareMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoftwareMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SoftwareMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SoftwareMetaAggregateArgs>(args: Subset<T, SoftwareMetaAggregateArgs>): Prisma.PrismaPromise<GetSoftwareMetaAggregateType<T>>

    /**
     * Group by SoftwareMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareMetaGroupByArgs} args - Group by arguments.
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
      T extends SoftwareMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoftwareMetaGroupByArgs['orderBy'] }
        : { orderBy?: SoftwareMetaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SoftwareMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoftwareMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SoftwareMeta model
   */
  readonly fields: SoftwareMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SoftwareMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoftwareMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SoftwareMeta model
   */
  interface SoftwareMetaFieldRefs {
    readonly id: FieldRef<"SoftwareMeta", 'String'>
    readonly projectId: FieldRef<"SoftwareMeta", 'String'>
    readonly techStack: FieldRef<"SoftwareMeta", 'String[]'>
    readonly liveUrl: FieldRef<"SoftwareMeta", 'String'>
    readonly repoUrl: FieldRef<"SoftwareMeta", 'String'>
    readonly lighthouseScore: FieldRef<"SoftwareMeta", 'Int'>
    readonly pageLoadMs: FieldRef<"SoftwareMeta", 'Int'>
    readonly monthlyVisitors: FieldRef<"SoftwareMeta", 'Int'>
    readonly uptime: FieldRef<"SoftwareMeta", 'Float'>
    readonly analyticsNote: FieldRef<"SoftwareMeta", 'String'>
    readonly createdAt: FieldRef<"SoftwareMeta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SoftwareMeta findUnique
   */
  export type SoftwareMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter, which SoftwareMeta to fetch.
     */
    where: SoftwareMetaWhereUniqueInput
  }

  /**
   * SoftwareMeta findUniqueOrThrow
   */
  export type SoftwareMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter, which SoftwareMeta to fetch.
     */
    where: SoftwareMetaWhereUniqueInput
  }

  /**
   * SoftwareMeta findFirst
   */
  export type SoftwareMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter, which SoftwareMeta to fetch.
     */
    where?: SoftwareMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoftwareMetas to fetch.
     */
    orderBy?: SoftwareMetaOrderByWithRelationInput | SoftwareMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoftwareMetas.
     */
    cursor?: SoftwareMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoftwareMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoftwareMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoftwareMetas.
     */
    distinct?: SoftwareMetaScalarFieldEnum | SoftwareMetaScalarFieldEnum[]
  }

  /**
   * SoftwareMeta findFirstOrThrow
   */
  export type SoftwareMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter, which SoftwareMeta to fetch.
     */
    where?: SoftwareMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoftwareMetas to fetch.
     */
    orderBy?: SoftwareMetaOrderByWithRelationInput | SoftwareMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoftwareMetas.
     */
    cursor?: SoftwareMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoftwareMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoftwareMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoftwareMetas.
     */
    distinct?: SoftwareMetaScalarFieldEnum | SoftwareMetaScalarFieldEnum[]
  }

  /**
   * SoftwareMeta findMany
   */
  export type SoftwareMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter, which SoftwareMetas to fetch.
     */
    where?: SoftwareMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoftwareMetas to fetch.
     */
    orderBy?: SoftwareMetaOrderByWithRelationInput | SoftwareMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SoftwareMetas.
     */
    cursor?: SoftwareMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoftwareMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoftwareMetas.
     */
    skip?: number
    distinct?: SoftwareMetaScalarFieldEnum | SoftwareMetaScalarFieldEnum[]
  }

  /**
   * SoftwareMeta create
   */
  export type SoftwareMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * The data needed to create a SoftwareMeta.
     */
    data: XOR<SoftwareMetaCreateInput, SoftwareMetaUncheckedCreateInput>
  }

  /**
   * SoftwareMeta createMany
   */
  export type SoftwareMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoftwareMetas.
     */
    data: SoftwareMetaCreateManyInput | SoftwareMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoftwareMeta createManyAndReturn
   */
  export type SoftwareMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * The data used to create many SoftwareMetas.
     */
    data: SoftwareMetaCreateManyInput | SoftwareMetaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SoftwareMeta update
   */
  export type SoftwareMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * The data needed to update a SoftwareMeta.
     */
    data: XOR<SoftwareMetaUpdateInput, SoftwareMetaUncheckedUpdateInput>
    /**
     * Choose, which SoftwareMeta to update.
     */
    where: SoftwareMetaWhereUniqueInput
  }

  /**
   * SoftwareMeta updateMany
   */
  export type SoftwareMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SoftwareMetas.
     */
    data: XOR<SoftwareMetaUpdateManyMutationInput, SoftwareMetaUncheckedUpdateManyInput>
    /**
     * Filter which SoftwareMetas to update
     */
    where?: SoftwareMetaWhereInput
    /**
     * Limit how many SoftwareMetas to update.
     */
    limit?: number
  }

  /**
   * SoftwareMeta updateManyAndReturn
   */
  export type SoftwareMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * The data used to update SoftwareMetas.
     */
    data: XOR<SoftwareMetaUpdateManyMutationInput, SoftwareMetaUncheckedUpdateManyInput>
    /**
     * Filter which SoftwareMetas to update
     */
    where?: SoftwareMetaWhereInput
    /**
     * Limit how many SoftwareMetas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SoftwareMeta upsert
   */
  export type SoftwareMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * The filter to search for the SoftwareMeta to update in case it exists.
     */
    where: SoftwareMetaWhereUniqueInput
    /**
     * In case the SoftwareMeta found by the `where` argument doesn't exist, create a new SoftwareMeta with this data.
     */
    create: XOR<SoftwareMetaCreateInput, SoftwareMetaUncheckedCreateInput>
    /**
     * In case the SoftwareMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoftwareMetaUpdateInput, SoftwareMetaUncheckedUpdateInput>
  }

  /**
   * SoftwareMeta delete
   */
  export type SoftwareMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
    /**
     * Filter which SoftwareMeta to delete.
     */
    where: SoftwareMetaWhereUniqueInput
  }

  /**
   * SoftwareMeta deleteMany
   */
  export type SoftwareMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoftwareMetas to delete
     */
    where?: SoftwareMetaWhereInput
    /**
     * Limit how many SoftwareMetas to delete.
     */
    limit?: number
  }

  /**
   * SoftwareMeta without action
   */
  export type SoftwareMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareMeta
     */
    select?: SoftwareMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoftwareMeta
     */
    omit?: SoftwareMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoftwareMetaInclude<ExtArgs> | null
  }


  /**
   * Model ArtMeta
   */

  export type AggregateArtMeta = {
    _count: ArtMetaCountAggregateOutputType | null
    _avg: ArtMetaAvgAggregateOutputType | null
    _sum: ArtMetaSumAggregateOutputType | null
    _min: ArtMetaMinAggregateOutputType | null
    _max: ArtMetaMaxAggregateOutputType | null
  }

  export type ArtMetaAvgAggregateOutputType = {
    year: number | null
    price: number | null
  }

  export type ArtMetaSumAggregateOutputType = {
    year: number | null
    price: number | null
  }

  export type ArtMetaMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    medium: $Enums.ArtMedium | null
    dimensions: string | null
    year: number | null
    isAvailable: boolean | null
    price: number | null
    shopUrl: string | null
    createdAt: Date | null
  }

  export type ArtMetaMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    medium: $Enums.ArtMedium | null
    dimensions: string | null
    year: number | null
    isAvailable: boolean | null
    price: number | null
    shopUrl: string | null
    createdAt: Date | null
  }

  export type ArtMetaCountAggregateOutputType = {
    id: number
    projectId: number
    medium: number
    dimensions: number
    year: number
    isAvailable: number
    price: number
    shopUrl: number
    createdAt: number
    _all: number
  }


  export type ArtMetaAvgAggregateInputType = {
    year?: true
    price?: true
  }

  export type ArtMetaSumAggregateInputType = {
    year?: true
    price?: true
  }

  export type ArtMetaMinAggregateInputType = {
    id?: true
    projectId?: true
    medium?: true
    dimensions?: true
    year?: true
    isAvailable?: true
    price?: true
    shopUrl?: true
    createdAt?: true
  }

  export type ArtMetaMaxAggregateInputType = {
    id?: true
    projectId?: true
    medium?: true
    dimensions?: true
    year?: true
    isAvailable?: true
    price?: true
    shopUrl?: true
    createdAt?: true
  }

  export type ArtMetaCountAggregateInputType = {
    id?: true
    projectId?: true
    medium?: true
    dimensions?: true
    year?: true
    isAvailable?: true
    price?: true
    shopUrl?: true
    createdAt?: true
    _all?: true
  }

  export type ArtMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtMeta to aggregate.
     */
    where?: ArtMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtMetas to fetch.
     */
    orderBy?: ArtMetaOrderByWithRelationInput | ArtMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArtMetas
    **/
    _count?: true | ArtMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtMetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtMetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtMetaMaxAggregateInputType
  }

  export type GetArtMetaAggregateType<T extends ArtMetaAggregateArgs> = {
        [P in keyof T & keyof AggregateArtMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtMeta[P]>
      : GetScalarType<T[P], AggregateArtMeta[P]>
  }




  export type ArtMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtMetaWhereInput
    orderBy?: ArtMetaOrderByWithAggregationInput | ArtMetaOrderByWithAggregationInput[]
    by: ArtMetaScalarFieldEnum[] | ArtMetaScalarFieldEnum
    having?: ArtMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtMetaCountAggregateInputType | true
    _avg?: ArtMetaAvgAggregateInputType
    _sum?: ArtMetaSumAggregateInputType
    _min?: ArtMetaMinAggregateInputType
    _max?: ArtMetaMaxAggregateInputType
  }

  export type ArtMetaGroupByOutputType = {
    id: string
    projectId: string
    medium: $Enums.ArtMedium
    dimensions: string | null
    year: number | null
    isAvailable: boolean
    price: number | null
    shopUrl: string | null
    createdAt: Date
    _count: ArtMetaCountAggregateOutputType | null
    _avg: ArtMetaAvgAggregateOutputType | null
    _sum: ArtMetaSumAggregateOutputType | null
    _min: ArtMetaMinAggregateOutputType | null
    _max: ArtMetaMaxAggregateOutputType | null
  }

  type GetArtMetaGroupByPayload<T extends ArtMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtMetaGroupByOutputType[P]>
            : GetScalarType<T[P], ArtMetaGroupByOutputType[P]>
        }
      >
    >


  export type ArtMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    medium?: boolean
    dimensions?: boolean
    year?: boolean
    isAvailable?: boolean
    price?: boolean
    shopUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artMeta"]>

  export type ArtMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    medium?: boolean
    dimensions?: boolean
    year?: boolean
    isAvailable?: boolean
    price?: boolean
    shopUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artMeta"]>

  export type ArtMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    medium?: boolean
    dimensions?: boolean
    year?: boolean
    isAvailable?: boolean
    price?: boolean
    shopUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artMeta"]>

  export type ArtMetaSelectScalar = {
    id?: boolean
    projectId?: boolean
    medium?: boolean
    dimensions?: boolean
    year?: boolean
    isAvailable?: boolean
    price?: boolean
    shopUrl?: boolean
    createdAt?: boolean
  }

  export type ArtMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "medium" | "dimensions" | "year" | "isAvailable" | "price" | "shopUrl" | "createdAt", ExtArgs["result"]["artMeta"]>
  export type ArtMetaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ArtMetaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ArtMetaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ArtMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArtMeta"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      medium: $Enums.ArtMedium
      dimensions: string | null
      year: number | null
      isAvailable: boolean
      price: number | null
      shopUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["artMeta"]>
    composites: {}
  }

  type ArtMetaGetPayload<S extends boolean | null | undefined | ArtMetaDefaultArgs> = $Result.GetResult<Prisma.$ArtMetaPayload, S>

  type ArtMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtMetaCountAggregateInputType | true
    }

  export interface ArtMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArtMeta'], meta: { name: 'ArtMeta' } }
    /**
     * Find zero or one ArtMeta that matches the filter.
     * @param {ArtMetaFindUniqueArgs} args - Arguments to find a ArtMeta
     * @example
     * // Get one ArtMeta
     * const artMeta = await prisma.artMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtMetaFindUniqueArgs>(args: SelectSubset<T, ArtMetaFindUniqueArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArtMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtMetaFindUniqueOrThrowArgs} args - Arguments to find a ArtMeta
     * @example
     * // Get one ArtMeta
     * const artMeta = await prisma.artMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaFindFirstArgs} args - Arguments to find a ArtMeta
     * @example
     * // Get one ArtMeta
     * const artMeta = await prisma.artMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtMetaFindFirstArgs>(args?: SelectSubset<T, ArtMetaFindFirstArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArtMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaFindFirstOrThrowArgs} args - Arguments to find a ArtMeta
     * @example
     * // Get one ArtMeta
     * const artMeta = await prisma.artMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArtMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArtMetas
     * const artMetas = await prisma.artMeta.findMany()
     * 
     * // Get first 10 ArtMetas
     * const artMetas = await prisma.artMeta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artMetaWithIdOnly = await prisma.artMeta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtMetaFindManyArgs>(args?: SelectSubset<T, ArtMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArtMeta.
     * @param {ArtMetaCreateArgs} args - Arguments to create a ArtMeta.
     * @example
     * // Create one ArtMeta
     * const ArtMeta = await prisma.artMeta.create({
     *   data: {
     *     // ... data to create a ArtMeta
     *   }
     * })
     * 
     */
    create<T extends ArtMetaCreateArgs>(args: SelectSubset<T, ArtMetaCreateArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArtMetas.
     * @param {ArtMetaCreateManyArgs} args - Arguments to create many ArtMetas.
     * @example
     * // Create many ArtMetas
     * const artMeta = await prisma.artMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtMetaCreateManyArgs>(args?: SelectSubset<T, ArtMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArtMetas and returns the data saved in the database.
     * @param {ArtMetaCreateManyAndReturnArgs} args - Arguments to create many ArtMetas.
     * @example
     * // Create many ArtMetas
     * const artMeta = await prisma.artMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArtMetas and only return the `id`
     * const artMetaWithIdOnly = await prisma.artMeta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArtMeta.
     * @param {ArtMetaDeleteArgs} args - Arguments to delete one ArtMeta.
     * @example
     * // Delete one ArtMeta
     * const ArtMeta = await prisma.artMeta.delete({
     *   where: {
     *     // ... filter to delete one ArtMeta
     *   }
     * })
     * 
     */
    delete<T extends ArtMetaDeleteArgs>(args: SelectSubset<T, ArtMetaDeleteArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArtMeta.
     * @param {ArtMetaUpdateArgs} args - Arguments to update one ArtMeta.
     * @example
     * // Update one ArtMeta
     * const artMeta = await prisma.artMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtMetaUpdateArgs>(args: SelectSubset<T, ArtMetaUpdateArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArtMetas.
     * @param {ArtMetaDeleteManyArgs} args - Arguments to filter ArtMetas to delete.
     * @example
     * // Delete a few ArtMetas
     * const { count } = await prisma.artMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtMetaDeleteManyArgs>(args?: SelectSubset<T, ArtMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArtMetas
     * const artMeta = await prisma.artMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtMetaUpdateManyArgs>(args: SelectSubset<T, ArtMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArtMetas and returns the data updated in the database.
     * @param {ArtMetaUpdateManyAndReturnArgs} args - Arguments to update many ArtMetas.
     * @example
     * // Update many ArtMetas
     * const artMeta = await prisma.artMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArtMetas and only return the `id`
     * const artMetaWithIdOnly = await prisma.artMeta.updateManyAndReturn({
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
    updateManyAndReturn<T extends ArtMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArtMeta.
     * @param {ArtMetaUpsertArgs} args - Arguments to update or create a ArtMeta.
     * @example
     * // Update or create a ArtMeta
     * const artMeta = await prisma.artMeta.upsert({
     *   create: {
     *     // ... data to create a ArtMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArtMeta we want to update
     *   }
     * })
     */
    upsert<T extends ArtMetaUpsertArgs>(args: SelectSubset<T, ArtMetaUpsertArgs<ExtArgs>>): Prisma__ArtMetaClient<$Result.GetResult<Prisma.$ArtMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArtMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaCountArgs} args - Arguments to filter ArtMetas to count.
     * @example
     * // Count the number of ArtMetas
     * const count = await prisma.artMeta.count({
     *   where: {
     *     // ... the filter for the ArtMetas we want to count
     *   }
     * })
    **/
    count<T extends ArtMetaCountArgs>(
      args?: Subset<T, ArtMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArtMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArtMetaAggregateArgs>(args: Subset<T, ArtMetaAggregateArgs>): Prisma.PrismaPromise<GetArtMetaAggregateType<T>>

    /**
     * Group by ArtMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtMetaGroupByArgs} args - Group by arguments.
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
      T extends ArtMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtMetaGroupByArgs['orderBy'] }
        : { orderBy?: ArtMetaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArtMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArtMeta model
   */
  readonly fields: ArtMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArtMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ArtMeta model
   */
  interface ArtMetaFieldRefs {
    readonly id: FieldRef<"ArtMeta", 'String'>
    readonly projectId: FieldRef<"ArtMeta", 'String'>
    readonly medium: FieldRef<"ArtMeta", 'ArtMedium'>
    readonly dimensions: FieldRef<"ArtMeta", 'String'>
    readonly year: FieldRef<"ArtMeta", 'Int'>
    readonly isAvailable: FieldRef<"ArtMeta", 'Boolean'>
    readonly price: FieldRef<"ArtMeta", 'Float'>
    readonly shopUrl: FieldRef<"ArtMeta", 'String'>
    readonly createdAt: FieldRef<"ArtMeta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArtMeta findUnique
   */
  export type ArtMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter, which ArtMeta to fetch.
     */
    where: ArtMetaWhereUniqueInput
  }

  /**
   * ArtMeta findUniqueOrThrow
   */
  export type ArtMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter, which ArtMeta to fetch.
     */
    where: ArtMetaWhereUniqueInput
  }

  /**
   * ArtMeta findFirst
   */
  export type ArtMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter, which ArtMeta to fetch.
     */
    where?: ArtMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtMetas to fetch.
     */
    orderBy?: ArtMetaOrderByWithRelationInput | ArtMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtMetas.
     */
    cursor?: ArtMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtMetas.
     */
    distinct?: ArtMetaScalarFieldEnum | ArtMetaScalarFieldEnum[]
  }

  /**
   * ArtMeta findFirstOrThrow
   */
  export type ArtMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter, which ArtMeta to fetch.
     */
    where?: ArtMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtMetas to fetch.
     */
    orderBy?: ArtMetaOrderByWithRelationInput | ArtMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArtMetas.
     */
    cursor?: ArtMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArtMetas.
     */
    distinct?: ArtMetaScalarFieldEnum | ArtMetaScalarFieldEnum[]
  }

  /**
   * ArtMeta findMany
   */
  export type ArtMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter, which ArtMetas to fetch.
     */
    where?: ArtMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArtMetas to fetch.
     */
    orderBy?: ArtMetaOrderByWithRelationInput | ArtMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArtMetas.
     */
    cursor?: ArtMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArtMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArtMetas.
     */
    skip?: number
    distinct?: ArtMetaScalarFieldEnum | ArtMetaScalarFieldEnum[]
  }

  /**
   * ArtMeta create
   */
  export type ArtMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * The data needed to create a ArtMeta.
     */
    data: XOR<ArtMetaCreateInput, ArtMetaUncheckedCreateInput>
  }

  /**
   * ArtMeta createMany
   */
  export type ArtMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArtMetas.
     */
    data: ArtMetaCreateManyInput | ArtMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArtMeta createManyAndReturn
   */
  export type ArtMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * The data used to create many ArtMetas.
     */
    data: ArtMetaCreateManyInput | ArtMetaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtMeta update
   */
  export type ArtMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * The data needed to update a ArtMeta.
     */
    data: XOR<ArtMetaUpdateInput, ArtMetaUncheckedUpdateInput>
    /**
     * Choose, which ArtMeta to update.
     */
    where: ArtMetaWhereUniqueInput
  }

  /**
   * ArtMeta updateMany
   */
  export type ArtMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArtMetas.
     */
    data: XOR<ArtMetaUpdateManyMutationInput, ArtMetaUncheckedUpdateManyInput>
    /**
     * Filter which ArtMetas to update
     */
    where?: ArtMetaWhereInput
    /**
     * Limit how many ArtMetas to update.
     */
    limit?: number
  }

  /**
   * ArtMeta updateManyAndReturn
   */
  export type ArtMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * The data used to update ArtMetas.
     */
    data: XOR<ArtMetaUpdateManyMutationInput, ArtMetaUncheckedUpdateManyInput>
    /**
     * Filter which ArtMetas to update
     */
    where?: ArtMetaWhereInput
    /**
     * Limit how many ArtMetas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArtMeta upsert
   */
  export type ArtMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * The filter to search for the ArtMeta to update in case it exists.
     */
    where: ArtMetaWhereUniqueInput
    /**
     * In case the ArtMeta found by the `where` argument doesn't exist, create a new ArtMeta with this data.
     */
    create: XOR<ArtMetaCreateInput, ArtMetaUncheckedCreateInput>
    /**
     * In case the ArtMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtMetaUpdateInput, ArtMetaUncheckedUpdateInput>
  }

  /**
   * ArtMeta delete
   */
  export type ArtMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
    /**
     * Filter which ArtMeta to delete.
     */
    where: ArtMetaWhereUniqueInput
  }

  /**
   * ArtMeta deleteMany
   */
  export type ArtMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArtMetas to delete
     */
    where?: ArtMetaWhereInput
    /**
     * Limit how many ArtMetas to delete.
     */
    limit?: number
  }

  /**
   * ArtMeta without action
   */
  export type ArtMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtMeta
     */
    select?: ArtMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArtMeta
     */
    omit?: ArtMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtMetaInclude<ExtArgs> | null
  }


  /**
   * Model DesignMeta
   */

  export type AggregateDesignMeta = {
    _count: DesignMetaCountAggregateOutputType | null
    _avg: DesignMetaAvgAggregateOutputType | null
    _sum: DesignMetaSumAggregateOutputType | null
    _min: DesignMetaMinAggregateOutputType | null
    _max: DesignMetaMaxAggregateOutputType | null
  }

  export type DesignMetaAvgAggregateOutputType = {
    year: number | null
  }

  export type DesignMetaSumAggregateOutputType = {
    year: number | null
  }

  export type DesignMetaMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    clientName: string | null
    year: number | null
    behanceUrl: string | null
    createdAt: Date | null
  }

  export type DesignMetaMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    clientName: string | null
    year: number | null
    behanceUrl: string | null
    createdAt: Date | null
  }

  export type DesignMetaCountAggregateOutputType = {
    id: number
    projectId: number
    software: number
    clientName: number
    year: number
    behanceUrl: number
    createdAt: number
    _all: number
  }


  export type DesignMetaAvgAggregateInputType = {
    year?: true
  }

  export type DesignMetaSumAggregateInputType = {
    year?: true
  }

  export type DesignMetaMinAggregateInputType = {
    id?: true
    projectId?: true
    clientName?: true
    year?: true
    behanceUrl?: true
    createdAt?: true
  }

  export type DesignMetaMaxAggregateInputType = {
    id?: true
    projectId?: true
    clientName?: true
    year?: true
    behanceUrl?: true
    createdAt?: true
  }

  export type DesignMetaCountAggregateInputType = {
    id?: true
    projectId?: true
    software?: true
    clientName?: true
    year?: true
    behanceUrl?: true
    createdAt?: true
    _all?: true
  }

  export type DesignMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignMeta to aggregate.
     */
    where?: DesignMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignMetas to fetch.
     */
    orderBy?: DesignMetaOrderByWithRelationInput | DesignMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignMetas
    **/
    _count?: true | DesignMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DesignMetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DesignMetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignMetaMaxAggregateInputType
  }

  export type GetDesignMetaAggregateType<T extends DesignMetaAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignMeta[P]>
      : GetScalarType<T[P], AggregateDesignMeta[P]>
  }




  export type DesignMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignMetaWhereInput
    orderBy?: DesignMetaOrderByWithAggregationInput | DesignMetaOrderByWithAggregationInput[]
    by: DesignMetaScalarFieldEnum[] | DesignMetaScalarFieldEnum
    having?: DesignMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignMetaCountAggregateInputType | true
    _avg?: DesignMetaAvgAggregateInputType
    _sum?: DesignMetaSumAggregateInputType
    _min?: DesignMetaMinAggregateInputType
    _max?: DesignMetaMaxAggregateInputType
  }

  export type DesignMetaGroupByOutputType = {
    id: string
    projectId: string
    software: string[]
    clientName: string | null
    year: number | null
    behanceUrl: string | null
    createdAt: Date
    _count: DesignMetaCountAggregateOutputType | null
    _avg: DesignMetaAvgAggregateOutputType | null
    _sum: DesignMetaSumAggregateOutputType | null
    _min: DesignMetaMinAggregateOutputType | null
    _max: DesignMetaMaxAggregateOutputType | null
  }

  type GetDesignMetaGroupByPayload<T extends DesignMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignMetaGroupByOutputType[P]>
            : GetScalarType<T[P], DesignMetaGroupByOutputType[P]>
        }
      >
    >


  export type DesignMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    software?: boolean
    clientName?: boolean
    year?: boolean
    behanceUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designMeta"]>

  export type DesignMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    software?: boolean
    clientName?: boolean
    year?: boolean
    behanceUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designMeta"]>

  export type DesignMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    software?: boolean
    clientName?: boolean
    year?: boolean
    behanceUrl?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designMeta"]>

  export type DesignMetaSelectScalar = {
    id?: boolean
    projectId?: boolean
    software?: boolean
    clientName?: boolean
    year?: boolean
    behanceUrl?: boolean
    createdAt?: boolean
  }

  export type DesignMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "software" | "clientName" | "year" | "behanceUrl" | "createdAt", ExtArgs["result"]["designMeta"]>
  export type DesignMetaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DesignMetaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DesignMetaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $DesignMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignMeta"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      software: string[]
      clientName: string | null
      year: number | null
      behanceUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["designMeta"]>
    composites: {}
  }

  type DesignMetaGetPayload<S extends boolean | null | undefined | DesignMetaDefaultArgs> = $Result.GetResult<Prisma.$DesignMetaPayload, S>

  type DesignMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignMetaCountAggregateInputType | true
    }

  export interface DesignMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignMeta'], meta: { name: 'DesignMeta' } }
    /**
     * Find zero or one DesignMeta that matches the filter.
     * @param {DesignMetaFindUniqueArgs} args - Arguments to find a DesignMeta
     * @example
     * // Get one DesignMeta
     * const designMeta = await prisma.designMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignMetaFindUniqueArgs>(args: SelectSubset<T, DesignMetaFindUniqueArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignMetaFindUniqueOrThrowArgs} args - Arguments to find a DesignMeta
     * @example
     * // Get one DesignMeta
     * const designMeta = await prisma.designMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaFindFirstArgs} args - Arguments to find a DesignMeta
     * @example
     * // Get one DesignMeta
     * const designMeta = await prisma.designMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignMetaFindFirstArgs>(args?: SelectSubset<T, DesignMetaFindFirstArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaFindFirstOrThrowArgs} args - Arguments to find a DesignMeta
     * @example
     * // Get one DesignMeta
     * const designMeta = await prisma.designMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignMetas
     * const designMetas = await prisma.designMeta.findMany()
     * 
     * // Get first 10 DesignMetas
     * const designMetas = await prisma.designMeta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designMetaWithIdOnly = await prisma.designMeta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignMetaFindManyArgs>(args?: SelectSubset<T, DesignMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignMeta.
     * @param {DesignMetaCreateArgs} args - Arguments to create a DesignMeta.
     * @example
     * // Create one DesignMeta
     * const DesignMeta = await prisma.designMeta.create({
     *   data: {
     *     // ... data to create a DesignMeta
     *   }
     * })
     * 
     */
    create<T extends DesignMetaCreateArgs>(args: SelectSubset<T, DesignMetaCreateArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignMetas.
     * @param {DesignMetaCreateManyArgs} args - Arguments to create many DesignMetas.
     * @example
     * // Create many DesignMetas
     * const designMeta = await prisma.designMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignMetaCreateManyArgs>(args?: SelectSubset<T, DesignMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignMetas and returns the data saved in the database.
     * @param {DesignMetaCreateManyAndReturnArgs} args - Arguments to create many DesignMetas.
     * @example
     * // Create many DesignMetas
     * const designMeta = await prisma.designMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignMetas and only return the `id`
     * const designMetaWithIdOnly = await prisma.designMeta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignMeta.
     * @param {DesignMetaDeleteArgs} args - Arguments to delete one DesignMeta.
     * @example
     * // Delete one DesignMeta
     * const DesignMeta = await prisma.designMeta.delete({
     *   where: {
     *     // ... filter to delete one DesignMeta
     *   }
     * })
     * 
     */
    delete<T extends DesignMetaDeleteArgs>(args: SelectSubset<T, DesignMetaDeleteArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignMeta.
     * @param {DesignMetaUpdateArgs} args - Arguments to update one DesignMeta.
     * @example
     * // Update one DesignMeta
     * const designMeta = await prisma.designMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignMetaUpdateArgs>(args: SelectSubset<T, DesignMetaUpdateArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignMetas.
     * @param {DesignMetaDeleteManyArgs} args - Arguments to filter DesignMetas to delete.
     * @example
     * // Delete a few DesignMetas
     * const { count } = await prisma.designMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignMetaDeleteManyArgs>(args?: SelectSubset<T, DesignMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignMetas
     * const designMeta = await prisma.designMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignMetaUpdateManyArgs>(args: SelectSubset<T, DesignMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignMetas and returns the data updated in the database.
     * @param {DesignMetaUpdateManyAndReturnArgs} args - Arguments to update many DesignMetas.
     * @example
     * // Update many DesignMetas
     * const designMeta = await prisma.designMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignMetas and only return the `id`
     * const designMetaWithIdOnly = await prisma.designMeta.updateManyAndReturn({
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
    updateManyAndReturn<T extends DesignMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignMeta.
     * @param {DesignMetaUpsertArgs} args - Arguments to update or create a DesignMeta.
     * @example
     * // Update or create a DesignMeta
     * const designMeta = await prisma.designMeta.upsert({
     *   create: {
     *     // ... data to create a DesignMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignMeta we want to update
     *   }
     * })
     */
    upsert<T extends DesignMetaUpsertArgs>(args: SelectSubset<T, DesignMetaUpsertArgs<ExtArgs>>): Prisma__DesignMetaClient<$Result.GetResult<Prisma.$DesignMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaCountArgs} args - Arguments to filter DesignMetas to count.
     * @example
     * // Count the number of DesignMetas
     * const count = await prisma.designMeta.count({
     *   where: {
     *     // ... the filter for the DesignMetas we want to count
     *   }
     * })
    **/
    count<T extends DesignMetaCountArgs>(
      args?: Subset<T, DesignMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DesignMetaAggregateArgs>(args: Subset<T, DesignMetaAggregateArgs>): Prisma.PrismaPromise<GetDesignMetaAggregateType<T>>

    /**
     * Group by DesignMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignMetaGroupByArgs} args - Group by arguments.
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
      T extends DesignMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignMetaGroupByArgs['orderBy'] }
        : { orderBy?: DesignMetaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DesignMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignMeta model
   */
  readonly fields: DesignMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DesignMeta model
   */
  interface DesignMetaFieldRefs {
    readonly id: FieldRef<"DesignMeta", 'String'>
    readonly projectId: FieldRef<"DesignMeta", 'String'>
    readonly software: FieldRef<"DesignMeta", 'String[]'>
    readonly clientName: FieldRef<"DesignMeta", 'String'>
    readonly year: FieldRef<"DesignMeta", 'Int'>
    readonly behanceUrl: FieldRef<"DesignMeta", 'String'>
    readonly createdAt: FieldRef<"DesignMeta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DesignMeta findUnique
   */
  export type DesignMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter, which DesignMeta to fetch.
     */
    where: DesignMetaWhereUniqueInput
  }

  /**
   * DesignMeta findUniqueOrThrow
   */
  export type DesignMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter, which DesignMeta to fetch.
     */
    where: DesignMetaWhereUniqueInput
  }

  /**
   * DesignMeta findFirst
   */
  export type DesignMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter, which DesignMeta to fetch.
     */
    where?: DesignMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignMetas to fetch.
     */
    orderBy?: DesignMetaOrderByWithRelationInput | DesignMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignMetas.
     */
    cursor?: DesignMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignMetas.
     */
    distinct?: DesignMetaScalarFieldEnum | DesignMetaScalarFieldEnum[]
  }

  /**
   * DesignMeta findFirstOrThrow
   */
  export type DesignMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter, which DesignMeta to fetch.
     */
    where?: DesignMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignMetas to fetch.
     */
    orderBy?: DesignMetaOrderByWithRelationInput | DesignMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignMetas.
     */
    cursor?: DesignMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignMetas.
     */
    distinct?: DesignMetaScalarFieldEnum | DesignMetaScalarFieldEnum[]
  }

  /**
   * DesignMeta findMany
   */
  export type DesignMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter, which DesignMetas to fetch.
     */
    where?: DesignMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignMetas to fetch.
     */
    orderBy?: DesignMetaOrderByWithRelationInput | DesignMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignMetas.
     */
    cursor?: DesignMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignMetas.
     */
    skip?: number
    distinct?: DesignMetaScalarFieldEnum | DesignMetaScalarFieldEnum[]
  }

  /**
   * DesignMeta create
   */
  export type DesignMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignMeta.
     */
    data: XOR<DesignMetaCreateInput, DesignMetaUncheckedCreateInput>
  }

  /**
   * DesignMeta createMany
   */
  export type DesignMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignMetas.
     */
    data: DesignMetaCreateManyInput | DesignMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DesignMeta createManyAndReturn
   */
  export type DesignMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * The data used to create many DesignMetas.
     */
    data: DesignMetaCreateManyInput | DesignMetaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignMeta update
   */
  export type DesignMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignMeta.
     */
    data: XOR<DesignMetaUpdateInput, DesignMetaUncheckedUpdateInput>
    /**
     * Choose, which DesignMeta to update.
     */
    where: DesignMetaWhereUniqueInput
  }

  /**
   * DesignMeta updateMany
   */
  export type DesignMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignMetas.
     */
    data: XOR<DesignMetaUpdateManyMutationInput, DesignMetaUncheckedUpdateManyInput>
    /**
     * Filter which DesignMetas to update
     */
    where?: DesignMetaWhereInput
    /**
     * Limit how many DesignMetas to update.
     */
    limit?: number
  }

  /**
   * DesignMeta updateManyAndReturn
   */
  export type DesignMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * The data used to update DesignMetas.
     */
    data: XOR<DesignMetaUpdateManyMutationInput, DesignMetaUncheckedUpdateManyInput>
    /**
     * Filter which DesignMetas to update
     */
    where?: DesignMetaWhereInput
    /**
     * Limit how many DesignMetas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignMeta upsert
   */
  export type DesignMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignMeta to update in case it exists.
     */
    where: DesignMetaWhereUniqueInput
    /**
     * In case the DesignMeta found by the `where` argument doesn't exist, create a new DesignMeta with this data.
     */
    create: XOR<DesignMetaCreateInput, DesignMetaUncheckedCreateInput>
    /**
     * In case the DesignMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignMetaUpdateInput, DesignMetaUncheckedUpdateInput>
  }

  /**
   * DesignMeta delete
   */
  export type DesignMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
    /**
     * Filter which DesignMeta to delete.
     */
    where: DesignMetaWhereUniqueInput
  }

  /**
   * DesignMeta deleteMany
   */
  export type DesignMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignMetas to delete
     */
    where?: DesignMetaWhereInput
    /**
     * Limit how many DesignMetas to delete.
     */
    limit?: number
  }

  /**
   * DesignMeta without action
   */
  export type DesignMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignMeta
     */
    select?: DesignMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignMeta
     */
    omit?: DesignMetaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignMetaInclude<ExtArgs> | null
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
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    category: 'category',
    description: 'description',
    tags: 'tags',
    displayOrder: 'displayOrder',
    featured: 'featured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectImageScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    imageUrl: 'imageUrl',
    altText: 'altText',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt'
  };

  export type ProjectImageScalarFieldEnum = (typeof ProjectImageScalarFieldEnum)[keyof typeof ProjectImageScalarFieldEnum]


  export const ProjectLinkScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    label: 'label',
    url: 'url',
    linkType: 'linkType',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt'
  };

  export type ProjectLinkScalarFieldEnum = (typeof ProjectLinkScalarFieldEnum)[keyof typeof ProjectLinkScalarFieldEnum]


  export const SoftwareMetaScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    techStack: 'techStack',
    liveUrl: 'liveUrl',
    repoUrl: 'repoUrl',
    lighthouseScore: 'lighthouseScore',
    pageLoadMs: 'pageLoadMs',
    monthlyVisitors: 'monthlyVisitors',
    uptime: 'uptime',
    analyticsNote: 'analyticsNote',
    createdAt: 'createdAt'
  };

  export type SoftwareMetaScalarFieldEnum = (typeof SoftwareMetaScalarFieldEnum)[keyof typeof SoftwareMetaScalarFieldEnum]


  export const ArtMetaScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    medium: 'medium',
    dimensions: 'dimensions',
    year: 'year',
    isAvailable: 'isAvailable',
    price: 'price',
    shopUrl: 'shopUrl',
    createdAt: 'createdAt'
  };

  export type ArtMetaScalarFieldEnum = (typeof ArtMetaScalarFieldEnum)[keyof typeof ArtMetaScalarFieldEnum]


  export const DesignMetaScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    software: 'software',
    clientName: 'clientName',
    year: 'year',
    behanceUrl: 'behanceUrl',
    createdAt: 'createdAt'
  };

  export type DesignMetaScalarFieldEnum = (typeof DesignMetaScalarFieldEnum)[keyof typeof DesignMetaScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Category'
   */
  export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>
    


  /**
   * Reference to a field of type 'Category[]'
   */
  export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LinkType'
   */
  export type EnumLinkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LinkType'>
    


  /**
   * Reference to a field of type 'LinkType[]'
   */
  export type ListEnumLinkTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LinkType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ArtMedium'
   */
  export type EnumArtMediumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArtMedium'>
    


  /**
   * Reference to a field of type 'ArtMedium[]'
   */
  export type ListEnumArtMediumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArtMedium[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    category?: EnumCategoryFilter<"Project"> | $Enums.Category
    description?: StringNullableFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    displayOrder?: IntFilter<"Project"> | number
    featured?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    images?: ProjectImageListRelationFilter
    links?: ProjectLinkListRelationFilter
    softwareMeta?: XOR<SoftwareMetaNullableScalarRelationFilter, SoftwareMetaWhereInput> | null
    artMeta?: XOR<ArtMetaNullableScalarRelationFilter, ArtMetaWhereInput> | null
    designMeta?: XOR<DesignMetaNullableScalarRelationFilter, DesignMetaWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    displayOrder?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    images?: ProjectImageOrderByRelationAggregateInput
    links?: ProjectLinkOrderByRelationAggregateInput
    softwareMeta?: SoftwareMetaOrderByWithRelationInput
    artMeta?: ArtMetaOrderByWithRelationInput
    designMeta?: DesignMetaOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    category?: EnumCategoryFilter<"Project"> | $Enums.Category
    description?: StringNullableFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    displayOrder?: IntFilter<"Project"> | number
    featured?: BoolFilter<"Project"> | boolean
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    images?: ProjectImageListRelationFilter
    links?: ProjectLinkListRelationFilter
    softwareMeta?: XOR<SoftwareMetaNullableScalarRelationFilter, SoftwareMetaWhereInput> | null
    artMeta?: XOR<ArtMetaNullableScalarRelationFilter, ArtMetaWhereInput> | null
    designMeta?: XOR<DesignMetaNullableScalarRelationFilter, DesignMetaWhereInput> | null
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    displayOrder?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    category?: EnumCategoryWithAggregatesFilter<"Project"> | $Enums.Category
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    displayOrder?: IntWithAggregatesFilter<"Project"> | number
    featured?: BoolWithAggregatesFilter<"Project"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectImageWhereInput = {
    AND?: ProjectImageWhereInput | ProjectImageWhereInput[]
    OR?: ProjectImageWhereInput[]
    NOT?: ProjectImageWhereInput | ProjectImageWhereInput[]
    id?: StringFilter<"ProjectImage"> | string
    projectId?: StringFilter<"ProjectImage"> | string
    imageUrl?: StringFilter<"ProjectImage"> | string
    altText?: StringNullableFilter<"ProjectImage"> | string | null
    displayOrder?: IntFilter<"ProjectImage"> | number
    createdAt?: DateTimeFilter<"ProjectImage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectImageOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectImageWhereInput | ProjectImageWhereInput[]
    OR?: ProjectImageWhereInput[]
    NOT?: ProjectImageWhereInput | ProjectImageWhereInput[]
    projectId?: StringFilter<"ProjectImage"> | string
    imageUrl?: StringFilter<"ProjectImage"> | string
    altText?: StringNullableFilter<"ProjectImage"> | string | null
    displayOrder?: IntFilter<"ProjectImage"> | number
    createdAt?: DateTimeFilter<"ProjectImage"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectImageOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectImageCountOrderByAggregateInput
    _avg?: ProjectImageAvgOrderByAggregateInput
    _max?: ProjectImageMaxOrderByAggregateInput
    _min?: ProjectImageMinOrderByAggregateInput
    _sum?: ProjectImageSumOrderByAggregateInput
  }

  export type ProjectImageScalarWhereWithAggregatesInput = {
    AND?: ProjectImageScalarWhereWithAggregatesInput | ProjectImageScalarWhereWithAggregatesInput[]
    OR?: ProjectImageScalarWhereWithAggregatesInput[]
    NOT?: ProjectImageScalarWhereWithAggregatesInput | ProjectImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectImage"> | string
    projectId?: StringWithAggregatesFilter<"ProjectImage"> | string
    imageUrl?: StringWithAggregatesFilter<"ProjectImage"> | string
    altText?: StringNullableWithAggregatesFilter<"ProjectImage"> | string | null
    displayOrder?: IntWithAggregatesFilter<"ProjectImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectImage"> | Date | string
  }

  export type ProjectLinkWhereInput = {
    AND?: ProjectLinkWhereInput | ProjectLinkWhereInput[]
    OR?: ProjectLinkWhereInput[]
    NOT?: ProjectLinkWhereInput | ProjectLinkWhereInput[]
    id?: StringFilter<"ProjectLink"> | string
    projectId?: StringFilter<"ProjectLink"> | string
    label?: StringFilter<"ProjectLink"> | string
    url?: StringFilter<"ProjectLink"> | string
    linkType?: EnumLinkTypeFilter<"ProjectLink"> | $Enums.LinkType
    displayOrder?: IntFilter<"ProjectLink"> | number
    createdAt?: DateTimeFilter<"ProjectLink"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectLinkOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    linkType?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectLinkWhereInput | ProjectLinkWhereInput[]
    OR?: ProjectLinkWhereInput[]
    NOT?: ProjectLinkWhereInput | ProjectLinkWhereInput[]
    projectId?: StringFilter<"ProjectLink"> | string
    label?: StringFilter<"ProjectLink"> | string
    url?: StringFilter<"ProjectLink"> | string
    linkType?: EnumLinkTypeFilter<"ProjectLink"> | $Enums.LinkType
    displayOrder?: IntFilter<"ProjectLink"> | number
    createdAt?: DateTimeFilter<"ProjectLink"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectLinkOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    linkType?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectLinkCountOrderByAggregateInput
    _avg?: ProjectLinkAvgOrderByAggregateInput
    _max?: ProjectLinkMaxOrderByAggregateInput
    _min?: ProjectLinkMinOrderByAggregateInput
    _sum?: ProjectLinkSumOrderByAggregateInput
  }

  export type ProjectLinkScalarWhereWithAggregatesInput = {
    AND?: ProjectLinkScalarWhereWithAggregatesInput | ProjectLinkScalarWhereWithAggregatesInput[]
    OR?: ProjectLinkScalarWhereWithAggregatesInput[]
    NOT?: ProjectLinkScalarWhereWithAggregatesInput | ProjectLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectLink"> | string
    projectId?: StringWithAggregatesFilter<"ProjectLink"> | string
    label?: StringWithAggregatesFilter<"ProjectLink"> | string
    url?: StringWithAggregatesFilter<"ProjectLink"> | string
    linkType?: EnumLinkTypeWithAggregatesFilter<"ProjectLink"> | $Enums.LinkType
    displayOrder?: IntWithAggregatesFilter<"ProjectLink"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectLink"> | Date | string
  }

  export type SoftwareMetaWhereInput = {
    AND?: SoftwareMetaWhereInput | SoftwareMetaWhereInput[]
    OR?: SoftwareMetaWhereInput[]
    NOT?: SoftwareMetaWhereInput | SoftwareMetaWhereInput[]
    id?: StringFilter<"SoftwareMeta"> | string
    projectId?: StringFilter<"SoftwareMeta"> | string
    techStack?: StringNullableListFilter<"SoftwareMeta">
    liveUrl?: StringNullableFilter<"SoftwareMeta"> | string | null
    repoUrl?: StringNullableFilter<"SoftwareMeta"> | string | null
    lighthouseScore?: IntNullableFilter<"SoftwareMeta"> | number | null
    pageLoadMs?: IntNullableFilter<"SoftwareMeta"> | number | null
    monthlyVisitors?: IntNullableFilter<"SoftwareMeta"> | number | null
    uptime?: FloatNullableFilter<"SoftwareMeta"> | number | null
    analyticsNote?: StringNullableFilter<"SoftwareMeta"> | string | null
    createdAt?: DateTimeFilter<"SoftwareMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type SoftwareMetaOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    techStack?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    repoUrl?: SortOrderInput | SortOrder
    lighthouseScore?: SortOrderInput | SortOrder
    pageLoadMs?: SortOrderInput | SortOrder
    monthlyVisitors?: SortOrderInput | SortOrder
    uptime?: SortOrderInput | SortOrder
    analyticsNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type SoftwareMetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: SoftwareMetaWhereInput | SoftwareMetaWhereInput[]
    OR?: SoftwareMetaWhereInput[]
    NOT?: SoftwareMetaWhereInput | SoftwareMetaWhereInput[]
    techStack?: StringNullableListFilter<"SoftwareMeta">
    liveUrl?: StringNullableFilter<"SoftwareMeta"> | string | null
    repoUrl?: StringNullableFilter<"SoftwareMeta"> | string | null
    lighthouseScore?: IntNullableFilter<"SoftwareMeta"> | number | null
    pageLoadMs?: IntNullableFilter<"SoftwareMeta"> | number | null
    monthlyVisitors?: IntNullableFilter<"SoftwareMeta"> | number | null
    uptime?: FloatNullableFilter<"SoftwareMeta"> | number | null
    analyticsNote?: StringNullableFilter<"SoftwareMeta"> | string | null
    createdAt?: DateTimeFilter<"SoftwareMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type SoftwareMetaOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    techStack?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    repoUrl?: SortOrderInput | SortOrder
    lighthouseScore?: SortOrderInput | SortOrder
    pageLoadMs?: SortOrderInput | SortOrder
    monthlyVisitors?: SortOrderInput | SortOrder
    uptime?: SortOrderInput | SortOrder
    analyticsNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SoftwareMetaCountOrderByAggregateInput
    _avg?: SoftwareMetaAvgOrderByAggregateInput
    _max?: SoftwareMetaMaxOrderByAggregateInput
    _min?: SoftwareMetaMinOrderByAggregateInput
    _sum?: SoftwareMetaSumOrderByAggregateInput
  }

  export type SoftwareMetaScalarWhereWithAggregatesInput = {
    AND?: SoftwareMetaScalarWhereWithAggregatesInput | SoftwareMetaScalarWhereWithAggregatesInput[]
    OR?: SoftwareMetaScalarWhereWithAggregatesInput[]
    NOT?: SoftwareMetaScalarWhereWithAggregatesInput | SoftwareMetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SoftwareMeta"> | string
    projectId?: StringWithAggregatesFilter<"SoftwareMeta"> | string
    techStack?: StringNullableListFilter<"SoftwareMeta">
    liveUrl?: StringNullableWithAggregatesFilter<"SoftwareMeta"> | string | null
    repoUrl?: StringNullableWithAggregatesFilter<"SoftwareMeta"> | string | null
    lighthouseScore?: IntNullableWithAggregatesFilter<"SoftwareMeta"> | number | null
    pageLoadMs?: IntNullableWithAggregatesFilter<"SoftwareMeta"> | number | null
    monthlyVisitors?: IntNullableWithAggregatesFilter<"SoftwareMeta"> | number | null
    uptime?: FloatNullableWithAggregatesFilter<"SoftwareMeta"> | number | null
    analyticsNote?: StringNullableWithAggregatesFilter<"SoftwareMeta"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SoftwareMeta"> | Date | string
  }

  export type ArtMetaWhereInput = {
    AND?: ArtMetaWhereInput | ArtMetaWhereInput[]
    OR?: ArtMetaWhereInput[]
    NOT?: ArtMetaWhereInput | ArtMetaWhereInput[]
    id?: StringFilter<"ArtMeta"> | string
    projectId?: StringFilter<"ArtMeta"> | string
    medium?: EnumArtMediumFilter<"ArtMeta"> | $Enums.ArtMedium
    dimensions?: StringNullableFilter<"ArtMeta"> | string | null
    year?: IntNullableFilter<"ArtMeta"> | number | null
    isAvailable?: BoolFilter<"ArtMeta"> | boolean
    price?: FloatNullableFilter<"ArtMeta"> | number | null
    shopUrl?: StringNullableFilter<"ArtMeta"> | string | null
    createdAt?: DateTimeFilter<"ArtMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ArtMetaOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    medium?: SortOrder
    dimensions?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    price?: SortOrderInput | SortOrder
    shopUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ArtMetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: ArtMetaWhereInput | ArtMetaWhereInput[]
    OR?: ArtMetaWhereInput[]
    NOT?: ArtMetaWhereInput | ArtMetaWhereInput[]
    medium?: EnumArtMediumFilter<"ArtMeta"> | $Enums.ArtMedium
    dimensions?: StringNullableFilter<"ArtMeta"> | string | null
    year?: IntNullableFilter<"ArtMeta"> | number | null
    isAvailable?: BoolFilter<"ArtMeta"> | boolean
    price?: FloatNullableFilter<"ArtMeta"> | number | null
    shopUrl?: StringNullableFilter<"ArtMeta"> | string | null
    createdAt?: DateTimeFilter<"ArtMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type ArtMetaOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    medium?: SortOrder
    dimensions?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    price?: SortOrderInput | SortOrder
    shopUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ArtMetaCountOrderByAggregateInput
    _avg?: ArtMetaAvgOrderByAggregateInput
    _max?: ArtMetaMaxOrderByAggregateInput
    _min?: ArtMetaMinOrderByAggregateInput
    _sum?: ArtMetaSumOrderByAggregateInput
  }

  export type ArtMetaScalarWhereWithAggregatesInput = {
    AND?: ArtMetaScalarWhereWithAggregatesInput | ArtMetaScalarWhereWithAggregatesInput[]
    OR?: ArtMetaScalarWhereWithAggregatesInput[]
    NOT?: ArtMetaScalarWhereWithAggregatesInput | ArtMetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArtMeta"> | string
    projectId?: StringWithAggregatesFilter<"ArtMeta"> | string
    medium?: EnumArtMediumWithAggregatesFilter<"ArtMeta"> | $Enums.ArtMedium
    dimensions?: StringNullableWithAggregatesFilter<"ArtMeta"> | string | null
    year?: IntNullableWithAggregatesFilter<"ArtMeta"> | number | null
    isAvailable?: BoolWithAggregatesFilter<"ArtMeta"> | boolean
    price?: FloatNullableWithAggregatesFilter<"ArtMeta"> | number | null
    shopUrl?: StringNullableWithAggregatesFilter<"ArtMeta"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ArtMeta"> | Date | string
  }

  export type DesignMetaWhereInput = {
    AND?: DesignMetaWhereInput | DesignMetaWhereInput[]
    OR?: DesignMetaWhereInput[]
    NOT?: DesignMetaWhereInput | DesignMetaWhereInput[]
    id?: StringFilter<"DesignMeta"> | string
    projectId?: StringFilter<"DesignMeta"> | string
    software?: StringNullableListFilter<"DesignMeta">
    clientName?: StringNullableFilter<"DesignMeta"> | string | null
    year?: IntNullableFilter<"DesignMeta"> | number | null
    behanceUrl?: StringNullableFilter<"DesignMeta"> | string | null
    createdAt?: DateTimeFilter<"DesignMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type DesignMetaOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    software?: SortOrder
    clientName?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    behanceUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type DesignMetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: DesignMetaWhereInput | DesignMetaWhereInput[]
    OR?: DesignMetaWhereInput[]
    NOT?: DesignMetaWhereInput | DesignMetaWhereInput[]
    software?: StringNullableListFilter<"DesignMeta">
    clientName?: StringNullableFilter<"DesignMeta"> | string | null
    year?: IntNullableFilter<"DesignMeta"> | number | null
    behanceUrl?: StringNullableFilter<"DesignMeta"> | string | null
    createdAt?: DateTimeFilter<"DesignMeta"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type DesignMetaOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    software?: SortOrder
    clientName?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    behanceUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DesignMetaCountOrderByAggregateInput
    _avg?: DesignMetaAvgOrderByAggregateInput
    _max?: DesignMetaMaxOrderByAggregateInput
    _min?: DesignMetaMinOrderByAggregateInput
    _sum?: DesignMetaSumOrderByAggregateInput
  }

  export type DesignMetaScalarWhereWithAggregatesInput = {
    AND?: DesignMetaScalarWhereWithAggregatesInput | DesignMetaScalarWhereWithAggregatesInput[]
    OR?: DesignMetaScalarWhereWithAggregatesInput[]
    NOT?: DesignMetaScalarWhereWithAggregatesInput | DesignMetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignMeta"> | string
    projectId?: StringWithAggregatesFilter<"DesignMeta"> | string
    software?: StringNullableListFilter<"DesignMeta">
    clientName?: StringNullableWithAggregatesFilter<"DesignMeta"> | string | null
    year?: IntNullableWithAggregatesFilter<"DesignMeta"> | number | null
    behanceUrl?: StringNullableWithAggregatesFilter<"DesignMeta"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DesignMeta"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageCreateNestedManyWithoutProjectInput
    links?: ProjectLinkCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageUncheckedCreateNestedManyWithoutProjectInput
    links?: ProjectLinkUncheckedCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaUncheckedCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUncheckedUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUncheckedUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectImageCreateInput = {
    id?: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutImagesInput
  }

  export type ProjectImageUncheckedCreateInput = {
    id?: string
    projectId: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProjectImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectImageCreateManyInput = {
    id?: string
    projectId: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkCreateInput = {
    id?: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutLinksInput
  }

  export type ProjectLinkUncheckedCreateInput = {
    id?: string
    projectId: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutLinksNestedInput
  }

  export type ProjectLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkCreateManyInput = {
    id?: string
    projectId: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoftwareMetaCreateInput = {
    id?: string
    techStack?: SoftwareMetaCreatetechStackInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    lighthouseScore?: number | null
    pageLoadMs?: number | null
    monthlyVisitors?: number | null
    uptime?: number | null
    analyticsNote?: string | null
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutSoftwareMetaInput
  }

  export type SoftwareMetaUncheckedCreateInput = {
    id?: string
    projectId: string
    techStack?: SoftwareMetaCreatetechStackInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    lighthouseScore?: number | null
    pageLoadMs?: number | null
    monthlyVisitors?: number | null
    uptime?: number | null
    analyticsNote?: string | null
    createdAt?: Date | string
  }

  export type SoftwareMetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutSoftwareMetaNestedInput
  }

  export type SoftwareMetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoftwareMetaCreateManyInput = {
    id?: string
    projectId: string
    techStack?: SoftwareMetaCreatetechStackInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    lighthouseScore?: number | null
    pageLoadMs?: number | null
    monthlyVisitors?: number | null
    uptime?: number | null
    analyticsNote?: string | null
    createdAt?: Date | string
  }

  export type SoftwareMetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoftwareMetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtMetaCreateInput = {
    id?: string
    medium: $Enums.ArtMedium
    dimensions?: string | null
    year?: number | null
    isAvailable?: boolean
    price?: number | null
    shopUrl?: string | null
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutArtMetaInput
  }

  export type ArtMetaUncheckedCreateInput = {
    id?: string
    projectId: string
    medium: $Enums.ArtMedium
    dimensions?: string | null
    year?: number | null
    isAvailable?: boolean
    price?: number | null
    shopUrl?: string | null
    createdAt?: Date | string
  }

  export type ArtMetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutArtMetaNestedInput
  }

  export type ArtMetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtMetaCreateManyInput = {
    id?: string
    projectId: string
    medium: $Enums.ArtMedium
    dimensions?: string | null
    year?: number | null
    isAvailable?: boolean
    price?: number | null
    shopUrl?: string | null
    createdAt?: Date | string
  }

  export type ArtMetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtMetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignMetaCreateInput = {
    id?: string
    software?: DesignMetaCreatesoftwareInput | string[]
    clientName?: string | null
    year?: number | null
    behanceUrl?: string | null
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignMetaInput
  }

  export type DesignMetaUncheckedCreateInput = {
    id?: string
    projectId: string
    software?: DesignMetaCreatesoftwareInput | string[]
    clientName?: string | null
    year?: number | null
    behanceUrl?: string | null
    createdAt?: Date | string
  }

  export type DesignMetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignMetaNestedInput
  }

  export type DesignMetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignMetaCreateManyInput = {
    id?: string
    projectId: string
    software?: DesignMetaCreatesoftwareInput | string[]
    clientName?: string | null
    year?: number | null
    behanceUrl?: string | null
    createdAt?: Date | string
  }

  export type DesignMetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignMetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProjectImageListRelationFilter = {
    every?: ProjectImageWhereInput
    some?: ProjectImageWhereInput
    none?: ProjectImageWhereInput
  }

  export type ProjectLinkListRelationFilter = {
    every?: ProjectLinkWhereInput
    some?: ProjectLinkWhereInput
    none?: ProjectLinkWhereInput
  }

  export type SoftwareMetaNullableScalarRelationFilter = {
    is?: SoftwareMetaWhereInput | null
    isNot?: SoftwareMetaWhereInput | null
  }

  export type ArtMetaNullableScalarRelationFilter = {
    is?: ArtMetaWhereInput | null
    isNot?: ArtMetaWhereInput | null
  }

  export type DesignMetaNullableScalarRelationFilter = {
    is?: DesignMetaWhereInput | null
    isNot?: DesignMetaWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    displayOrder?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    description?: SortOrder
    displayOrder?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectImageCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectImageAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ProjectImageMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectImageMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectImageSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EnumLinkTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LinkType | EnumLinkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLinkTypeFilter<$PrismaModel> | $Enums.LinkType
  }

  export type ProjectLinkCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    linkType?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectLinkAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ProjectLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    linkType?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectLinkMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    linkType?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectLinkSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type EnumLinkTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LinkType | EnumLinkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLinkTypeWithAggregatesFilter<$PrismaModel> | $Enums.LinkType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLinkTypeFilter<$PrismaModel>
    _max?: NestedEnumLinkTypeFilter<$PrismaModel>
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

  export type SoftwareMetaCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    techStack?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    lighthouseScore?: SortOrder
    pageLoadMs?: SortOrder
    monthlyVisitors?: SortOrder
    uptime?: SortOrder
    analyticsNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SoftwareMetaAvgOrderByAggregateInput = {
    lighthouseScore?: SortOrder
    pageLoadMs?: SortOrder
    monthlyVisitors?: SortOrder
    uptime?: SortOrder
  }

  export type SoftwareMetaMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    lighthouseScore?: SortOrder
    pageLoadMs?: SortOrder
    monthlyVisitors?: SortOrder
    uptime?: SortOrder
    analyticsNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SoftwareMetaMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    lighthouseScore?: SortOrder
    pageLoadMs?: SortOrder
    monthlyVisitors?: SortOrder
    uptime?: SortOrder
    analyticsNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SoftwareMetaSumOrderByAggregateInput = {
    lighthouseScore?: SortOrder
    pageLoadMs?: SortOrder
    monthlyVisitors?: SortOrder
    uptime?: SortOrder
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

  export type EnumArtMediumFilter<$PrismaModel = never> = {
    equals?: $Enums.ArtMedium | EnumArtMediumFieldRefInput<$PrismaModel>
    in?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    not?: NestedEnumArtMediumFilter<$PrismaModel> | $Enums.ArtMedium
  }

  export type ArtMetaCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    medium?: SortOrder
    dimensions?: SortOrder
    year?: SortOrder
    isAvailable?: SortOrder
    price?: SortOrder
    shopUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ArtMetaAvgOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
  }

  export type ArtMetaMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    medium?: SortOrder
    dimensions?: SortOrder
    year?: SortOrder
    isAvailable?: SortOrder
    price?: SortOrder
    shopUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ArtMetaMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    medium?: SortOrder
    dimensions?: SortOrder
    year?: SortOrder
    isAvailable?: SortOrder
    price?: SortOrder
    shopUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ArtMetaSumOrderByAggregateInput = {
    year?: SortOrder
    price?: SortOrder
  }

  export type EnumArtMediumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArtMedium | EnumArtMediumFieldRefInput<$PrismaModel>
    in?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    not?: NestedEnumArtMediumWithAggregatesFilter<$PrismaModel> | $Enums.ArtMedium
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArtMediumFilter<$PrismaModel>
    _max?: NestedEnumArtMediumFilter<$PrismaModel>
  }

  export type DesignMetaCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    software?: SortOrder
    clientName?: SortOrder
    year?: SortOrder
    behanceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type DesignMetaAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type DesignMetaMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    clientName?: SortOrder
    year?: SortOrder
    behanceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type DesignMetaMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    clientName?: SortOrder
    year?: SortOrder
    behanceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type DesignMetaSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectCreatetagsInput = {
    set: string[]
  }

  export type ProjectImageCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput> | ProjectImageCreateWithoutProjectInput[] | ProjectImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectImageCreateOrConnectWithoutProjectInput | ProjectImageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectImageCreateManyProjectInputEnvelope
    connect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
  }

  export type ProjectLinkCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput> | ProjectLinkCreateWithoutProjectInput[] | ProjectLinkUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectLinkCreateOrConnectWithoutProjectInput | ProjectLinkCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectLinkCreateManyProjectInputEnvelope
    connect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
  }

  export type SoftwareMetaCreateNestedOneWithoutProjectInput = {
    create?: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: SoftwareMetaCreateOrConnectWithoutProjectInput
    connect?: SoftwareMetaWhereUniqueInput
  }

  export type ArtMetaCreateNestedOneWithoutProjectInput = {
    create?: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ArtMetaCreateOrConnectWithoutProjectInput
    connect?: ArtMetaWhereUniqueInput
  }

  export type DesignMetaCreateNestedOneWithoutProjectInput = {
    create?: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignMetaCreateOrConnectWithoutProjectInput
    connect?: DesignMetaWhereUniqueInput
  }

  export type ProjectImageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput> | ProjectImageCreateWithoutProjectInput[] | ProjectImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectImageCreateOrConnectWithoutProjectInput | ProjectImageCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectImageCreateManyProjectInputEnvelope
    connect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
  }

  export type ProjectLinkUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput> | ProjectLinkCreateWithoutProjectInput[] | ProjectLinkUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectLinkCreateOrConnectWithoutProjectInput | ProjectLinkCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectLinkCreateManyProjectInputEnvelope
    connect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
  }

  export type SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: SoftwareMetaCreateOrConnectWithoutProjectInput
    connect?: SoftwareMetaWhereUniqueInput
  }

  export type ArtMetaUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ArtMetaCreateOrConnectWithoutProjectInput
    connect?: ArtMetaWhereUniqueInput
  }

  export type DesignMetaUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignMetaCreateOrConnectWithoutProjectInput
    connect?: DesignMetaWhereUniqueInput
  }

  export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProjectUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProjectImageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput> | ProjectImageCreateWithoutProjectInput[] | ProjectImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectImageCreateOrConnectWithoutProjectInput | ProjectImageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectImageUpsertWithWhereUniqueWithoutProjectInput | ProjectImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectImageCreateManyProjectInputEnvelope
    set?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    disconnect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    delete?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    connect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    update?: ProjectImageUpdateWithWhereUniqueWithoutProjectInput | ProjectImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectImageUpdateManyWithWhereWithoutProjectInput | ProjectImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectImageScalarWhereInput | ProjectImageScalarWhereInput[]
  }

  export type ProjectLinkUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput> | ProjectLinkCreateWithoutProjectInput[] | ProjectLinkUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectLinkCreateOrConnectWithoutProjectInput | ProjectLinkCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectLinkUpsertWithWhereUniqueWithoutProjectInput | ProjectLinkUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectLinkCreateManyProjectInputEnvelope
    set?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    disconnect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    delete?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    connect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    update?: ProjectLinkUpdateWithWhereUniqueWithoutProjectInput | ProjectLinkUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectLinkUpdateManyWithWhereWithoutProjectInput | ProjectLinkUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectLinkScalarWhereInput | ProjectLinkScalarWhereInput[]
  }

  export type SoftwareMetaUpdateOneWithoutProjectNestedInput = {
    create?: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: SoftwareMetaCreateOrConnectWithoutProjectInput
    upsert?: SoftwareMetaUpsertWithoutProjectInput
    disconnect?: SoftwareMetaWhereInput | boolean
    delete?: SoftwareMetaWhereInput | boolean
    connect?: SoftwareMetaWhereUniqueInput
    update?: XOR<XOR<SoftwareMetaUpdateToOneWithWhereWithoutProjectInput, SoftwareMetaUpdateWithoutProjectInput>, SoftwareMetaUncheckedUpdateWithoutProjectInput>
  }

  export type ArtMetaUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ArtMetaCreateOrConnectWithoutProjectInput
    upsert?: ArtMetaUpsertWithoutProjectInput
    disconnect?: ArtMetaWhereInput | boolean
    delete?: ArtMetaWhereInput | boolean
    connect?: ArtMetaWhereUniqueInput
    update?: XOR<XOR<ArtMetaUpdateToOneWithWhereWithoutProjectInput, ArtMetaUpdateWithoutProjectInput>, ArtMetaUncheckedUpdateWithoutProjectInput>
  }

  export type DesignMetaUpdateOneWithoutProjectNestedInput = {
    create?: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignMetaCreateOrConnectWithoutProjectInput
    upsert?: DesignMetaUpsertWithoutProjectInput
    disconnect?: DesignMetaWhereInput | boolean
    delete?: DesignMetaWhereInput | boolean
    connect?: DesignMetaWhereUniqueInput
    update?: XOR<XOR<DesignMetaUpdateToOneWithWhereWithoutProjectInput, DesignMetaUpdateWithoutProjectInput>, DesignMetaUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectImageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput> | ProjectImageCreateWithoutProjectInput[] | ProjectImageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectImageCreateOrConnectWithoutProjectInput | ProjectImageCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectImageUpsertWithWhereUniqueWithoutProjectInput | ProjectImageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectImageCreateManyProjectInputEnvelope
    set?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    disconnect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    delete?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    connect?: ProjectImageWhereUniqueInput | ProjectImageWhereUniqueInput[]
    update?: ProjectImageUpdateWithWhereUniqueWithoutProjectInput | ProjectImageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectImageUpdateManyWithWhereWithoutProjectInput | ProjectImageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectImageScalarWhereInput | ProjectImageScalarWhereInput[]
  }

  export type ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput> | ProjectLinkCreateWithoutProjectInput[] | ProjectLinkUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectLinkCreateOrConnectWithoutProjectInput | ProjectLinkCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectLinkUpsertWithWhereUniqueWithoutProjectInput | ProjectLinkUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectLinkCreateManyProjectInputEnvelope
    set?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    disconnect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    delete?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    connect?: ProjectLinkWhereUniqueInput | ProjectLinkWhereUniqueInput[]
    update?: ProjectLinkUpdateWithWhereUniqueWithoutProjectInput | ProjectLinkUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectLinkUpdateManyWithWhereWithoutProjectInput | ProjectLinkUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectLinkScalarWhereInput | ProjectLinkScalarWhereInput[]
  }

  export type SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: SoftwareMetaCreateOrConnectWithoutProjectInput
    upsert?: SoftwareMetaUpsertWithoutProjectInput
    disconnect?: SoftwareMetaWhereInput | boolean
    delete?: SoftwareMetaWhereInput | boolean
    connect?: SoftwareMetaWhereUniqueInput
    update?: XOR<XOR<SoftwareMetaUpdateToOneWithWhereWithoutProjectInput, SoftwareMetaUpdateWithoutProjectInput>, SoftwareMetaUncheckedUpdateWithoutProjectInput>
  }

  export type ArtMetaUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ArtMetaCreateOrConnectWithoutProjectInput
    upsert?: ArtMetaUpsertWithoutProjectInput
    disconnect?: ArtMetaWhereInput | boolean
    delete?: ArtMetaWhereInput | boolean
    connect?: ArtMetaWhereUniqueInput
    update?: XOR<XOR<ArtMetaUpdateToOneWithWhereWithoutProjectInput, ArtMetaUpdateWithoutProjectInput>, ArtMetaUncheckedUpdateWithoutProjectInput>
  }

  export type DesignMetaUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignMetaCreateOrConnectWithoutProjectInput
    upsert?: DesignMetaUpsertWithoutProjectInput
    disconnect?: DesignMetaWhereInput | boolean
    delete?: DesignMetaWhereInput | boolean
    connect?: DesignMetaWhereUniqueInput
    update?: XOR<XOR<DesignMetaUpdateToOneWithWhereWithoutProjectInput, DesignMetaUpdateWithoutProjectInput>, DesignMetaUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutImagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutImagesInput
    upsert?: ProjectUpsertWithoutImagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutImagesInput, ProjectUpdateWithoutImagesInput>, ProjectUncheckedUpdateWithoutImagesInput>
  }

  export type ProjectCreateNestedOneWithoutLinksInput = {
    create?: XOR<ProjectCreateWithoutLinksInput, ProjectUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLinksInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumLinkTypeFieldUpdateOperationsInput = {
    set?: $Enums.LinkType
  }

  export type ProjectUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<ProjectCreateWithoutLinksInput, ProjectUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLinksInput
    upsert?: ProjectUpsertWithoutLinksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutLinksInput, ProjectUpdateWithoutLinksInput>, ProjectUncheckedUpdateWithoutLinksInput>
  }

  export type SoftwareMetaCreatetechStackInput = {
    set: string[]
  }

  export type ProjectCreateNestedOneWithoutSoftwareMetaInput = {
    create?: XOR<ProjectCreateWithoutSoftwareMetaInput, ProjectUncheckedCreateWithoutSoftwareMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSoftwareMetaInput
    connect?: ProjectWhereUniqueInput
  }

  export type SoftwareMetaUpdatetechStackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutSoftwareMetaNestedInput = {
    create?: XOR<ProjectCreateWithoutSoftwareMetaInput, ProjectUncheckedCreateWithoutSoftwareMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSoftwareMetaInput
    upsert?: ProjectUpsertWithoutSoftwareMetaInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSoftwareMetaInput, ProjectUpdateWithoutSoftwareMetaInput>, ProjectUncheckedUpdateWithoutSoftwareMetaInput>
  }

  export type ProjectCreateNestedOneWithoutArtMetaInput = {
    create?: XOR<ProjectCreateWithoutArtMetaInput, ProjectUncheckedCreateWithoutArtMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutArtMetaInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumArtMediumFieldUpdateOperationsInput = {
    set?: $Enums.ArtMedium
  }

  export type ProjectUpdateOneRequiredWithoutArtMetaNestedInput = {
    create?: XOR<ProjectCreateWithoutArtMetaInput, ProjectUncheckedCreateWithoutArtMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutArtMetaInput
    upsert?: ProjectUpsertWithoutArtMetaInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutArtMetaInput, ProjectUpdateWithoutArtMetaInput>, ProjectUncheckedUpdateWithoutArtMetaInput>
  }

  export type DesignMetaCreatesoftwareInput = {
    set: string[]
  }

  export type ProjectCreateNestedOneWithoutDesignMetaInput = {
    create?: XOR<ProjectCreateWithoutDesignMetaInput, ProjectUncheckedCreateWithoutDesignMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignMetaInput
    connect?: ProjectWhereUniqueInput
  }

  export type DesignMetaUpdatesoftwareInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdateOneRequiredWithoutDesignMetaNestedInput = {
    create?: XOR<ProjectCreateWithoutDesignMetaInput, ProjectUncheckedCreateWithoutDesignMetaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignMetaInput
    upsert?: ProjectUpsertWithoutDesignMetaInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDesignMetaInput, ProjectUpdateWithoutDesignMetaInput>, ProjectUncheckedUpdateWithoutDesignMetaInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumLinkTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LinkType | EnumLinkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLinkTypeFilter<$PrismaModel> | $Enums.LinkType
  }

  export type NestedEnumLinkTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LinkType | EnumLinkTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LinkType[] | ListEnumLinkTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLinkTypeWithAggregatesFilter<$PrismaModel> | $Enums.LinkType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLinkTypeFilter<$PrismaModel>
    _max?: NestedEnumLinkTypeFilter<$PrismaModel>
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

  export type NestedEnumArtMediumFilter<$PrismaModel = never> = {
    equals?: $Enums.ArtMedium | EnumArtMediumFieldRefInput<$PrismaModel>
    in?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    not?: NestedEnumArtMediumFilter<$PrismaModel> | $Enums.ArtMedium
  }

  export type NestedEnumArtMediumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArtMedium | EnumArtMediumFieldRefInput<$PrismaModel>
    in?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArtMedium[] | ListEnumArtMediumFieldRefInput<$PrismaModel>
    not?: NestedEnumArtMediumWithAggregatesFilter<$PrismaModel> | $Enums.ArtMedium
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArtMediumFilter<$PrismaModel>
    _max?: NestedEnumArtMediumFilter<$PrismaModel>
  }

  export type ProjectImageCreateWithoutProjectInput = {
    id?: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectImageUncheckedCreateWithoutProjectInput = {
    id?: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectImageCreateOrConnectWithoutProjectInput = {
    where: ProjectImageWhereUniqueInput
    create: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectImageCreateManyProjectInputEnvelope = {
    data: ProjectImageCreateManyProjectInput | ProjectImageCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectLinkCreateWithoutProjectInput = {
    id?: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectLinkUncheckedCreateWithoutProjectInput = {
    id?: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectLinkCreateOrConnectWithoutProjectInput = {
    where: ProjectLinkWhereUniqueInput
    create: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput>
  }

  export type ProjectLinkCreateManyProjectInputEnvelope = {
    data: ProjectLinkCreateManyProjectInput | ProjectLinkCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type SoftwareMetaCreateWithoutProjectInput = {
    id?: string
    techStack?: SoftwareMetaCreatetechStackInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    lighthouseScore?: number | null
    pageLoadMs?: number | null
    monthlyVisitors?: number | null
    uptime?: number | null
    analyticsNote?: string | null
    createdAt?: Date | string
  }

  export type SoftwareMetaUncheckedCreateWithoutProjectInput = {
    id?: string
    techStack?: SoftwareMetaCreatetechStackInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    lighthouseScore?: number | null
    pageLoadMs?: number | null
    monthlyVisitors?: number | null
    uptime?: number | null
    analyticsNote?: string | null
    createdAt?: Date | string
  }

  export type SoftwareMetaCreateOrConnectWithoutProjectInput = {
    where: SoftwareMetaWhereUniqueInput
    create: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
  }

  export type ArtMetaCreateWithoutProjectInput = {
    id?: string
    medium: $Enums.ArtMedium
    dimensions?: string | null
    year?: number | null
    isAvailable?: boolean
    price?: number | null
    shopUrl?: string | null
    createdAt?: Date | string
  }

  export type ArtMetaUncheckedCreateWithoutProjectInput = {
    id?: string
    medium: $Enums.ArtMedium
    dimensions?: string | null
    year?: number | null
    isAvailable?: boolean
    price?: number | null
    shopUrl?: string | null
    createdAt?: Date | string
  }

  export type ArtMetaCreateOrConnectWithoutProjectInput = {
    where: ArtMetaWhereUniqueInput
    create: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
  }

  export type DesignMetaCreateWithoutProjectInput = {
    id?: string
    software?: DesignMetaCreatesoftwareInput | string[]
    clientName?: string | null
    year?: number | null
    behanceUrl?: string | null
    createdAt?: Date | string
  }

  export type DesignMetaUncheckedCreateWithoutProjectInput = {
    id?: string
    software?: DesignMetaCreatesoftwareInput | string[]
    clientName?: string | null
    year?: number | null
    behanceUrl?: string | null
    createdAt?: Date | string
  }

  export type DesignMetaCreateOrConnectWithoutProjectInput = {
    where: DesignMetaWhereUniqueInput
    create: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
  }

  export type ProjectImageUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectImageWhereUniqueInput
    update: XOR<ProjectImageUpdateWithoutProjectInput, ProjectImageUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectImageCreateWithoutProjectInput, ProjectImageUncheckedCreateWithoutProjectInput>
  }

  export type ProjectImageUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectImageWhereUniqueInput
    data: XOR<ProjectImageUpdateWithoutProjectInput, ProjectImageUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectImageUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectImageScalarWhereInput
    data: XOR<ProjectImageUpdateManyMutationInput, ProjectImageUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectImageScalarWhereInput = {
    AND?: ProjectImageScalarWhereInput | ProjectImageScalarWhereInput[]
    OR?: ProjectImageScalarWhereInput[]
    NOT?: ProjectImageScalarWhereInput | ProjectImageScalarWhereInput[]
    id?: StringFilter<"ProjectImage"> | string
    projectId?: StringFilter<"ProjectImage"> | string
    imageUrl?: StringFilter<"ProjectImage"> | string
    altText?: StringNullableFilter<"ProjectImage"> | string | null
    displayOrder?: IntFilter<"ProjectImage"> | number
    createdAt?: DateTimeFilter<"ProjectImage"> | Date | string
  }

  export type ProjectLinkUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectLinkWhereUniqueInput
    update: XOR<ProjectLinkUpdateWithoutProjectInput, ProjectLinkUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectLinkCreateWithoutProjectInput, ProjectLinkUncheckedCreateWithoutProjectInput>
  }

  export type ProjectLinkUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectLinkWhereUniqueInput
    data: XOR<ProjectLinkUpdateWithoutProjectInput, ProjectLinkUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectLinkUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectLinkScalarWhereInput
    data: XOR<ProjectLinkUpdateManyMutationInput, ProjectLinkUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectLinkScalarWhereInput = {
    AND?: ProjectLinkScalarWhereInput | ProjectLinkScalarWhereInput[]
    OR?: ProjectLinkScalarWhereInput[]
    NOT?: ProjectLinkScalarWhereInput | ProjectLinkScalarWhereInput[]
    id?: StringFilter<"ProjectLink"> | string
    projectId?: StringFilter<"ProjectLink"> | string
    label?: StringFilter<"ProjectLink"> | string
    url?: StringFilter<"ProjectLink"> | string
    linkType?: EnumLinkTypeFilter<"ProjectLink"> | $Enums.LinkType
    displayOrder?: IntFilter<"ProjectLink"> | number
    createdAt?: DateTimeFilter<"ProjectLink"> | Date | string
  }

  export type SoftwareMetaUpsertWithoutProjectInput = {
    update: XOR<SoftwareMetaUpdateWithoutProjectInput, SoftwareMetaUncheckedUpdateWithoutProjectInput>
    create: XOR<SoftwareMetaCreateWithoutProjectInput, SoftwareMetaUncheckedCreateWithoutProjectInput>
    where?: SoftwareMetaWhereInput
  }

  export type SoftwareMetaUpdateToOneWithWhereWithoutProjectInput = {
    where?: SoftwareMetaWhereInput
    data: XOR<SoftwareMetaUpdateWithoutProjectInput, SoftwareMetaUncheckedUpdateWithoutProjectInput>
  }

  export type SoftwareMetaUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoftwareMetaUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    techStack?: SoftwareMetaUpdatetechStackInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lighthouseScore?: NullableIntFieldUpdateOperationsInput | number | null
    pageLoadMs?: NullableIntFieldUpdateOperationsInput | number | null
    monthlyVisitors?: NullableIntFieldUpdateOperationsInput | number | null
    uptime?: NullableFloatFieldUpdateOperationsInput | number | null
    analyticsNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtMetaUpsertWithoutProjectInput = {
    update: XOR<ArtMetaUpdateWithoutProjectInput, ArtMetaUncheckedUpdateWithoutProjectInput>
    create: XOR<ArtMetaCreateWithoutProjectInput, ArtMetaUncheckedCreateWithoutProjectInput>
    where?: ArtMetaWhereInput
  }

  export type ArtMetaUpdateToOneWithWhereWithoutProjectInput = {
    where?: ArtMetaWhereInput
    data: XOR<ArtMetaUpdateWithoutProjectInput, ArtMetaUncheckedUpdateWithoutProjectInput>
  }

  export type ArtMetaUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtMetaUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    medium?: EnumArtMediumFieldUpdateOperationsInput | $Enums.ArtMedium
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    shopUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignMetaUpsertWithoutProjectInput = {
    update: XOR<DesignMetaUpdateWithoutProjectInput, DesignMetaUncheckedUpdateWithoutProjectInput>
    create: XOR<DesignMetaCreateWithoutProjectInput, DesignMetaUncheckedCreateWithoutProjectInput>
    where?: DesignMetaWhereInput
  }

  export type DesignMetaUpdateToOneWithWhereWithoutProjectInput = {
    where?: DesignMetaWhereInput
    data: XOR<DesignMetaUpdateWithoutProjectInput, DesignMetaUncheckedUpdateWithoutProjectInput>
  }

  export type DesignMetaUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignMetaUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    software?: DesignMetaUpdatesoftwareInput | string[]
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    behanceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutImagesInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: ProjectLinkCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutImagesInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    links?: ProjectLinkUncheckedCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaUncheckedCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutImagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
  }

  export type ProjectUpsertWithoutImagesInput = {
    update: XOR<ProjectUpdateWithoutImagesInput, ProjectUncheckedUpdateWithoutImagesInput>
    create: XOR<ProjectCreateWithoutImagesInput, ProjectUncheckedCreateWithoutImagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutImagesInput, ProjectUncheckedUpdateWithoutImagesInput>
  }

  export type ProjectUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: ProjectLinkUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUncheckedUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutLinksInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutLinksInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageUncheckedCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaUncheckedCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutLinksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutLinksInput, ProjectUncheckedCreateWithoutLinksInput>
  }

  export type ProjectUpsertWithoutLinksInput = {
    update: XOR<ProjectUpdateWithoutLinksInput, ProjectUncheckedUpdateWithoutLinksInput>
    create: XOR<ProjectCreateWithoutLinksInput, ProjectUncheckedCreateWithoutLinksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutLinksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutLinksInput, ProjectUncheckedUpdateWithoutLinksInput>
  }

  export type ProjectUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUncheckedUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUncheckedUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutSoftwareMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageCreateNestedManyWithoutProjectInput
    links?: ProjectLinkCreateNestedManyWithoutProjectInput
    artMeta?: ArtMetaCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutSoftwareMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageUncheckedCreateNestedManyWithoutProjectInput
    links?: ProjectLinkUncheckedCreateNestedManyWithoutProjectInput
    artMeta?: ArtMetaUncheckedCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutSoftwareMetaInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSoftwareMetaInput, ProjectUncheckedCreateWithoutSoftwareMetaInput>
  }

  export type ProjectUpsertWithoutSoftwareMetaInput = {
    update: XOR<ProjectUpdateWithoutSoftwareMetaInput, ProjectUncheckedUpdateWithoutSoftwareMetaInput>
    create: XOR<ProjectCreateWithoutSoftwareMetaInput, ProjectUncheckedCreateWithoutSoftwareMetaInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSoftwareMetaInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSoftwareMetaInput, ProjectUncheckedUpdateWithoutSoftwareMetaInput>
  }

  export type ProjectUpdateWithoutSoftwareMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUpdateManyWithoutProjectNestedInput
    artMeta?: ArtMetaUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSoftwareMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUncheckedUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput
    artMeta?: ArtMetaUncheckedUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutArtMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageCreateNestedManyWithoutProjectInput
    links?: ProjectLinkCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutArtMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageUncheckedCreateNestedManyWithoutProjectInput
    links?: ProjectLinkUncheckedCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput
    designMeta?: DesignMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutArtMetaInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutArtMetaInput, ProjectUncheckedCreateWithoutArtMetaInput>
  }

  export type ProjectUpsertWithoutArtMetaInput = {
    update: XOR<ProjectUpdateWithoutArtMetaInput, ProjectUncheckedUpdateWithoutArtMetaInput>
    create: XOR<ProjectCreateWithoutArtMetaInput, ProjectUncheckedCreateWithoutArtMetaInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutArtMetaInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutArtMetaInput, ProjectUncheckedUpdateWithoutArtMetaInput>
  }

  export type ProjectUpdateWithoutArtMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutArtMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUncheckedUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput
    designMeta?: DesignMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutDesignMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageCreateNestedManyWithoutProjectInput
    links?: ProjectLinkCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDesignMetaInput = {
    id?: string
    title: string
    category: $Enums.Category
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    displayOrder?: number
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ProjectImageUncheckedCreateNestedManyWithoutProjectInput
    links?: ProjectLinkUncheckedCreateNestedManyWithoutProjectInput
    softwareMeta?: SoftwareMetaUncheckedCreateNestedOneWithoutProjectInput
    artMeta?: ArtMetaUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDesignMetaInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDesignMetaInput, ProjectUncheckedCreateWithoutDesignMetaInput>
  }

  export type ProjectUpsertWithoutDesignMetaInput = {
    update: XOR<ProjectUpdateWithoutDesignMetaInput, ProjectUncheckedUpdateWithoutDesignMetaInput>
    create: XOR<ProjectCreateWithoutDesignMetaInput, ProjectUncheckedCreateWithoutDesignMetaInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDesignMetaInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDesignMetaInput, ProjectUncheckedUpdateWithoutDesignMetaInput>
  }

  export type ProjectUpdateWithoutDesignMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDesignMetaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    displayOrder?: IntFieldUpdateOperationsInput | number
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ProjectImageUncheckedUpdateManyWithoutProjectNestedInput
    links?: ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput
    softwareMeta?: SoftwareMetaUncheckedUpdateOneWithoutProjectNestedInput
    artMeta?: ArtMetaUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectImageCreateManyProjectInput = {
    id?: string
    imageUrl: string
    altText?: string | null
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectLinkCreateManyProjectInput = {
    id?: string
    label: string
    url: string
    linkType?: $Enums.LinkType
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ProjectImageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectImageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectImageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectLinkUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    linkType?: EnumLinkTypeFieldUpdateOperationsInput | $Enums.LinkType
    displayOrder?: IntFieldUpdateOperationsInput | number
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