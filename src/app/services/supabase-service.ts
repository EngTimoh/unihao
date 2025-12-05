
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../enviroments/enviroment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _session = new BehaviorSubject<Session | null>(null);
  readonly session$ = this._session.asObservable();

  get client() {
    return this.supabase;
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.initializeSession();
  }

  private async initializeSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    this._session.next(session);

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._session.next(session);
    });
  }

  // Example: Get all rows from a table
  async getData(table: string) {
    const { data, error } = await this.supabase.from(table).select('*');
    if (error) throw error;
    return data;
  }

  // Example: Insert data into a table
  async insertData(table: string, row: any) {
    const { data, error } = await this.supabase.from(table).insert([row]);
    if (error) throw error;
    return data;
  }

  // Example: Auth sign up
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  // Example: Auth sign in
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  // Get current user
  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // Get session
  async getSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session;
  }

  get authChanges() {
    return this.supabase.auth.onAuthStateChange;
  }
}
