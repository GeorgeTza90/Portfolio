<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>
    <form method="POST" action="{{ route('register.store') }}" class="register-form">
        @csrf

        <div class="form-container-1">
            <div class="form-container-2">
                <x-forms.form-field>
                    <x-forms.form-label for="first_name">First Name</x-forms.form-label>
                    <x-forms.form-input name="first_name" id="first_name" required />
                    <x-forms.form-error type="first_name" />
                </x-forms.form-field>

                <x-forms.form-field>
                    <x-forms.form-label for="last_name">Last Name</x-forms.form-label>
                    <x-forms.form-input name="last_name" id="last_name" required />
                    <x-forms.form-error type="last_name" />
                </x-forms.form-field>

                <x-forms.form-field>
                    <x-forms.form-label for="email">Email</x-forms.form-label>
                    <x-forms.form-input name="email" id="email" type="email" required />
                    <x-forms.form-error type="email" />
                </x-forms.form-field>

                <x-forms.form-field>
                    <x-forms.form-label for="password">Password</x-forms.form-label>
                    <x-forms.form-input name="password" id="password" type="password" required />
                    <x-forms.form-error type="password" />
                </x-forms.form-field>

                <x-forms.form-field>
                    <x-forms.form-label for="password_confirmation">Confirm Password</x-forms.form-label>
                    <x-forms.form-input name="password_confirmation" id="password_confirmation" type="password"
                        required />
                    <x-forms.form-error type="password_confirmation" />
                </x-forms.form-field>
            </div>

            <div class="form-container-3">
                <a href="/" class="cancel">Cancel</a>
                <x-forms.form-button>Register</x-forms.form-button>
            </div>
        </div>
        <a href="/login">Already Registered?</a>
    </form>

    <x-ads.ad2 :width="100" />
</x-layouts.main>