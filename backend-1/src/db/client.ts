import { Env } from '../types/env';

/**
 * Database utility class for D1 operations
 */
export class DatabaseClient {
  private db: D1Database;
  
  constructor(env: Env) {
    this.db = env.DB;
  }
  
  /**
   * Execute a query with parameters
   */
  async query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
    try {
      const statement = params ? this.db.prepare(sql).bind(...params) : this.db.prepare(sql);
      const result = await statement.all<T>();
      return result.results;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error(`Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Execute a single query and return first result
   */
  async queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results[0] || null;
  }
  
  /**
   * Execute a command (INSERT, UPDATE, DELETE) and return affected rows
   */
  async execute(sql: string, params?: unknown[]): Promise<D1Result> {
    try {
      const statement = params ? this.db.prepare(sql).bind(...params) : this.db.prepare(sql);
      return await statement.run();
    } catch (error) {
      console.error('Database execute error:', error);
      throw new Error(`Database execute failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Execute multiple statements in a transaction
   */
  async transaction(statements: Array<{ sql: string; params?: unknown[] }>): Promise<D1Result[]> {
    try {
      const prepared = statements.map(({ sql, params }) => 
        params ? this.db.prepare(sql).bind(...params) : this.db.prepare(sql)
      );
      return await this.db.batch(prepared);
    } catch (error) {
      console.error('Database transaction error:', error);
      throw new Error(`Database transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Get the raw D1Database instance for advanced operations
   */
  getRawDb(): D1Database {
    return this.db;
  }
}