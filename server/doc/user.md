# User Experience Flow

## Quest Point Management

1. User accesses the home page (`/`)
2. User is directed to the app page (if logged in), otherwise, will log in
3. User is shown the app page (`/home`)
4. User navigates to the management portal
5. Server will check if user is authorized builder
6. User is shown the management portal (`/manage`)
7. Client-side JS manages the entire portal
8. User will send requests to the server to add and edit quest points (`/api/manage`)