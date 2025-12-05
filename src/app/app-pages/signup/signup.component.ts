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
            confirmPassword: ['', [Validators.required]]
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

        const { email, password } = this.signupForm.value;

        try {
            await this.supabaseService.signUp(email, password);
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
