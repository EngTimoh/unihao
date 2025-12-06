import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupForm: FormGroup;
    loading = false;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private supabaseService: SupabaseService,
        private router: Router
    ) {
        this.signupForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            user_name: ['', [Validators.required]],
            location: ['', [Validators.required]],
            phone_no: ['', [Validators.required]],
            gender: ['', [Validators.required]]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    async onSubmit() {
        if (this.signupForm.invalid) return;

        this.loading = true;
        this.error = null;

        const { email, password, user_name, location, phone_no, gender } = this.signupForm.value;

        try {
            const { user } = await this.supabaseService.signUp(email, password);

            if (user) {
                await this.supabaseService.insertData('profiles', {
                    user_name,
                    location,
                    phone_no,
                    gender,
                    email // Optional: if you want to store email in profiles too
                });

                // Prevent auto-login by signing out immediately
                await this.supabaseService.signOut();
            }

            // Depending on Supabase settings, might need to confirm email or just log in
            // For now, redirect to login or home
            this.router.navigate(['/login']);
            alert('Signup successful! Please log in.');
        } catch (err: any) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    }
}
