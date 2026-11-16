---
sidebar_position: 3
last_update:
  date: '2026-01-20T16:11:38.246Z'
  author: CI/CD Bot
content_hash: c2150ee31aa25b2ec6dbd36c9ce75555adb18bd7916678e58389ff483301bb7d
---

# Authentication & Team management

## Account registration

When reaching the Fast2 UI for the first time, you will be prompted to create an account.

<img src={require('../assets/img/authentication/registration_page.png').default} alt="Fast2 account registration page" style={{width:'100%',maxWidth:'600px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

To create a new account in Fast2, follow these steps:

1. **Fill in the Required Information**: Enter the following details:
   : **First Name**: Enter your first name.
   : **Last Name**: Enter your last name.
   : **Email**: Provide a valid email address. This will be used for login.
   : **Password**: Choose a strong password. Remember that your password is crucial for securing your account.
   : **Confirm Password**: Re-enter the same password to confirm it matches.

2. **Review the Password Guidelines**:
   : **Ensure your password meets the security requirements**: At least 8 characters long and maximum 16 characters long.

3. **Submit Your Information**:
   : Click on the "Creating my account" button to complete the registration.

:::warning

It is essential to remember your password. Fast2 does not offer password recovery for forgotten passwords.

:::

The first account created on a new installation becomes the **Super Admin**, the only account of this role. On a new server, create this account yourself before giving the UI address to anyone, and keep its password in a safe place: no other account can reset it (see [Resetting a member's password](#resetting-a-members-password)).

## Login

Once you have registered, you can log in to the Fast2 UI using your email and password.

<img src={require('../assets/img/authentication/login_page.png').default} alt="Fast2 login page" style={{width:'100%',maxWidth:'600px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

### Failed login attempts

After **3** failed login attempts in a row, the account is locked for **30 seconds**: wait, then log in again. A successful login resets the counter. Both values are set in `config/application.properties`:

```properties title="config/application.properties"
# Maximum failed authentication attempts before temporary account lock
security.authentication.maximum-failed-attempts=3

# Account lock duration after reaching maximum failed attempts (in seconds)
security.authentication.lock-time-duration=30
```

## Team management

Fast2 allows you to manage multiple users. **When starting Fast2 for the first time, the created user will be the super admin.** The Team Place allows authorized users (Super Admin and Admins) to manage team members in a Fast2 Place. It includes:

- Viewing all members with details: Name, Email, Role
- Adding, deleting, and updating member roles
- Resetting member passwords

### Navigating to Team Place

To access Team Place: Click on your account avatar in the bottom left corner of the screen and then select **Manage Team** from the popup menu.

<img src={require('../assets/img/authentication/navigateTeamPlace.gif').default} alt="Navigating to Team Place" style={{width:'100%',maxWidth:'720px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

#### User Access Restrictions

- **Super Admin/Admins**: Full access to Team Place.
- **Users**: If a user tries to access the Team Place, he will be redirected to EditPlace with error toast:
    > `You do not have permission to access this Place`

Outside the Team Place, the **User** role also has restricted rights in **SERVERS**:

- **Logs**: the **Broker logs** button and the **WORKER LOGS** column of the **WORKERS & LOGS** tab are shown to Super Admins and Admins only. Reading and downloading the broker log require an **Admin** or **Super Admin** account.
- **Libraries**: the **Import jar** button of the **LIBRARIES** tab is shown to Super Admins and Admins only (see [Importing or replacing JAR files](../catalog/uploadjar.md)).

### Adding a new member

#### Adding a new member as Super Admin

1. Click **Add Member**.
2. A modal appears with the following fields:
    - Role _(default: User, editable)_
    - First Name
    - Last Name
    - Email
    - Password
    - Confirm Password

#### Validations

- Email format validation and uniqueness check.
- Password requirements displayed when focusing on the field.
- Save button enabled only when all fields are valid.

<img src={require('../assets/img/authentication/addMember.gif').default} alt="Adding a new member" style={{width:'100%',maxWidth:'720px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

#### Adding a member as Admin

- Button labeled **Add User**.
- Role field preset to _User_ and **read-only**.

**Only Super Admin can add new members as Admins.**

### Deleting a member

#### Deleting a member as Super Admin

1. Select one or more members (Users or Admins) via checkboxes.
2. Click **Delete**.
3. Confirmation popup appears with:
    - Member details
    - Warning: `This action cannot be undone`
    - Buttons: **Cancel**, **Delete**

<img src={require('../assets/img/authentication/deleteMember.gif').default} alt="Deleting a member" style={{width:'100%',maxWidth:'720px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

#### Deleting a member as Admin

- Can delete **Users only**.
- Checkboxes for Admins and Super Admins are disabled.

### Changing a member's role

#### Changing role as Super Admin

1. Click on the role tile (User/Admin) for a member.
2. Mini popup appears:
    - _“Promote member → Admin”_ or _“Demote member → User”_
3. Confirm in the modal popup:
    - Member details
    - Warning about role change permissions

<img src={require('../assets/img/authentication/changeRole.gif').default} alt="Changing a member's role" style={{width:'100%',maxWidth:'720px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />

#### Changing role as Admin

- Can only promote or demote **Users**.
- Role change for other Admins or Super Admins is **not allowed**.

### Resetting a member's password

- Available in the Members table via **Reset Password** button.
- Confirmation popup appears before action.
- Success notification confirms the password reset.
- Do not forget to send the new password to the user.

Who can reset whom:

- A **Super Admin** can reset the password of Admins and Users.
- An **Admin** can reset the password of Users only.
- Nobody can reset their own password from the Members table.
- The **Super Admin** has no role above it: its password cannot be reset from the UI. If it is lost, contact the support.

<img src={require('../assets/img/authentication/resetPassword.gif').default} alt="Resetting a member's password" style={{width:'100%',maxWidth:'720px',display:'block',margin:'1.25rem auto',borderRadius:'12px',boxShadow:'0 10px 28px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.08)'}} />
