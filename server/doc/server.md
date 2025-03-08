# Server Control Flow

## Cases

### Authorization Check (`auth`)

**Steps:**
1. Check for session cookie in request
2. Validate session cookie with internal database

**Potential Results:**
- Success: Session cookie is present and valid
- Invalid: Session cookie is not present or invalid

### Builder Check (`b-auth`)

**Steps:**
1. Check for session cookie in request
2. Validate session cookie with internal database
3. Check if user has builders perms from database

**Potential Results:**
- Success: User has builders role
- Unauthorized: User does not have builders role
- Invalid: User is not logged in (session cookie is missing or invalid)

## Database

### Session Storage

**Table `sessions`**
- `SSID`: BINARY(16) // Unique session identifier
- `discordID`: BIGINT // Discord user ID
- `session_key`: INT // Used to generate session cookie
- `expires`: INT // Session expiration time
- `builder`: BOOLEAN // User has builders role

### Point storage

**Table `locations`**
- `locID`: SMALLINT // Unique location identifier
- `name`: TINYTEXT // Location name
- `type`: CHAR(1) // Location type (A, B, C, D)
- `notes`: TEXT // Location notes

**Table `loc_owners`**, multi-to-multi relationship
- `locID`: SMALLINT // Location identifier
- `ownerIndex`: BIGINT // Index of owner within location
- `ownerID`: BIGINT // Discord user ID

## Routes

### Landing Page (`/`)

1. Case: `auth`
2. -> Sucess
    1. Redirect user to app page
3. Show user home page
4. -> On Login Button Click
    1. Direct user to OAuth2 authorization endpoint
    2. User logs in and authorizes the application
    3. Obtain acess token from discord API
    4. Store access token in internal session storage
    5. Generate session cookie for use
    6. Send session cookie to user and redirect to app page

### App Page (`/home`)

1. Case: `auth`
2. -> Invalid
    1. Redirect user to landing page
3. Show user app page

### Management Page (`/manage`)

1. Case: `b-auth`
2. -> Invalid
    1. Redirect user to landing page
3. -> Unauthorized
    1. Redirect user to app page with unauthorized message
4. Show user management page