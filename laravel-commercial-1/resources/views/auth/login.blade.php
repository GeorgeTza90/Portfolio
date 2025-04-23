<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>
    <form method="POST" action="/login" class="register-form">
        @csrf

        <div class="form-container-1">
            <div class="form-container-2">
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
            </div>

            <div class="form-container-3">
                <a href="/" class="cancel">Cancel</a>
                <x-forms.form-button>Log In</x-forms.form-button>
            </div>
        </div>
        <a href="/register">Not Registered Yet?</a>
    </form>

    <x-ads.ad1 :width="100" />
</x-layouts.main>