# Supabase Authentication Guide

This document explains how authentication works in our application for both logged-in and non-logged-in users, focusing on what happens behind the scenes.

## Quick Reference Tables

### When User is NOT Logged In 🥷

| Operation Type             | Key Used              | Supabase Client | Use Case                                                                                                                | Security Level                                                                 |
| -------------------------- | --------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **🌐 Client-Side**         | Anon Key              | Client          | • 🔍 Viewing public content<br>• 🎮 Playing games anonymously<br>• 📚 Browsing available features                       | • 🛡️ RLS active<br>• 🌍 Public data only<br>• 🥷 User identity unknown         |
| **🖥️ Server User Context** | Anon Key (no cookies) | Server User     | • 📄 Server-rendered pages with public data<br>• 🔌 API endpoints for anonymous users<br>• 🔒 Operations respecting RLS | • 🛡️ RLS active<br>• 🌍 Public data only<br>• 🥷 User identity unknown         |
| **⚙️ Server Admin**        | Service Role Key      | Server Admin    | • 📝 Logging game plays<br>• 📊 Updating global statistics<br>• ✏️ Writing to protected tables                          | • 🔓 Bypasses RLS<br>• 🗄️ Full database access<br>• 🤖 System-level operations |

### When User IS Logged In 👨🏻‍💻

| Operation Type             | Key Used           | Supabase Client | Use Case                                                                                                                       | Security Level                                                             |
| -------------------------- | ------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **🌐 Client-Side**         | Anon Key + JWT     | Client          | • 👀 Viewing personalized content<br>• 🎯 Playing games with user identity<br>• 🔑 Accessing user-specific features            | • 🛡️ RLS active<br>• 🔐 Public + user data<br>• 👨🏻‍💻 User identity known     |
| **🖥️ Server User Context** | Anon Key + Cookies | Server User     | • 📄 Server-rendered pages with personalized data<br>• 🔌 API endpoints needing user identity<br>• 👨🏻‍💻 User-specific operations | • 🛡️ RLS active<br>• 🔐 Public + user data<br>• 👨🏻‍💻 User identity known     |
| **⚙️ Server Admin**        | Service Role Key   | Server Admin    | • 📊 Updating user statistics<br>• 📝 Logging user-specific actions<br>• 🔄 Cross-user operations                              | • 🔓 Bypasses RLS<br>• 🗄️ Full database access<br>• 🏷️ Can include user ID |

## Authentication Flow When User is NOT Logged In

### 🌐 Client-Side Operations

- **Auth Client**: Client-side Supabase client
- **Key Used**: Anon Key (public)
- **Example Operations**:
  - 🔍 Viewing public content
  - 🎮 Playing games anonymously
  - 📚 Browsing available features
- **What Happens**:
  - Requests include the anon key
  - No user session/JWT is attached
  - RLS policies filter data based on the absence of `auth.uid()`
  - Only publicly accessible data is returned

### 🖥️ Server-Side User Context Operations

- **Auth Client**: Server User Context client
- **Key Used**: Anon Key (but with no valid session cookies)
- **Example Operations**:
  - 📄 Server-rendered pages with public data
  - 🔌 API endpoints that work for anonymous users
  - 🔒 Operations that respect RLS policies
- **What Happens**:
  - Server checks for session cookies but finds none
  - Requests still include the anon key
  - User is treated as anonymous
  - RLS policies filter data based on the absence of `auth.uid()`
- **Key Characteristic**: Still respects RLS policies, just like client-side operations

### ⚙️ Server-Side Admin Operations

- **Auth Client**: Server Admin client
- **Key Used**: Service Role Key
- **Example Operations**:
  - 📝 Logging game plays
  - 📊 Updating global statistics
  - ✏️ Writing to protected tables
  - 🔓 Operations that need to bypass RLS
- **What Happens**:
  - Server uses the service role key
  - RLS policies are bypassed completely
  - Operations succeed regardless of authentication status
  - System can record data even for anonymous users
- **Key Characteristic**: Bypasses RLS policies completely

## Authentication Flow When User IS Logged In

### 🌐 Client-Side Operations

- **Auth Client**: Client-side Supabase client
- **Key Used**: Anon Key + JWT session token
- **Example Operations**:
  - 👀 Viewing personalized content
  - 🎯 Playing games with user identity
  - 🔑 Accessing user-specific features
- **What Happens**:
  - Requests include the anon key AND the user's JWT
  - Supabase identifies the user from the JWT
  - RLS policies filter data based on the user's `auth.uid()`
  - User-specific data is returned

### 🖥️ Server-Side User Context Operations

- **Auth Client**: Server User Context client
- **Key Used**: Anon Key + session cookies
- **Example Operations**:
  - 📄 Server-rendered pages with personalized data
  - 🔌 API endpoints that need user identity
  - 👤 Operations that should respect user permissions
- **What Happens**:
  - Server extracts session from cookies
  - Requests include the anon key AND the user's session
  - Supabase identifies the user from the session
  - RLS policies filter data based on the user's `auth.uid()`
- **Key Characteristic**: Respects RLS policies, but with user identity

### ⚙️ Server-Side Admin Operations

- **Auth Client**: Server Admin client
- **Key Used**: Service Role Key
- **Example Operations**:
  - 📊 Updating user statistics
  - 📝 Logging user-specific actions
  - 🔄 Cross-user operations
  - ✏️ Writing to protected tables
- **What Happens**:
  - Server uses the service role key
  - RLS policies are bypassed completely
  - Operations can access and modify any data
  - System can associate actions with the user ID
- **Key Characteristic**: Bypasses RLS policies completely

## Key Differences Between Operation Types

### 🌐 Client-Side vs. 🖥️ Server-Side

- **Where code runs**:
  - 🌐 Client-side: In the user's browser
  - 🖥️ Server-side: On the Next.js server
- **Security implications**:
  - 🌐 Client-side: User can see all code and potentially manipulate requests
  - 🖥️ Server-side: Code is hidden from users, more secure for sensitive operations

### ��️ User Context vs. ⚙️ Admin Operations

- **Both run on the server**, but:
  - 🖥️ **User Context**: Respects RLS policies, acts on behalf of the user
  - ⚙️ **Admin**: Bypasses RLS policies, has full database access
- **When to use**:
  - 🖥️ **User Context**: When you want to respect user permissions
  - ⚙️ **Admin**: When you need to perform operations that users shouldn't be able to do directly

## Client Implementations

Our Supabase clients are defined in:

- 🌐 Client-side: [src/lib/supabase/client.ts](../src/lib/supabase/client.ts)
- 🖥️ Server-side: [src/lib/supabase/server.ts](../src/lib/supabase/server.ts)
