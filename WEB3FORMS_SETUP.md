# Web3Forms Setup Instructions

## Get Your Access Key (Takes 2 Minutes)

1. **Visit:** https://web3forms.com

2. **Enter your email:** `edgar@fourwindsinternational.com`

3. **Click "Create Access Key"**

4. **Check your email** for the access key (arrives instantly)

5. **Copy the access key** - it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

## Add Access Key to Website

1. **Open:** `index.html` in your editor

2. **Find line 203:** (in the contact form section)
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```

3. **Replace** `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key:
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7890-abcd-ef1234567890">
   ```

4. **Save the file**

5. **Commit and push:**
   ```bash
   git add index.html
   git commit -m "Add Web3Forms access key"
   git push origin main
   ```

## Benefits of Web3Forms

✓ **No email activation required** - works immediately
✓ **100% Free** - unlimited submissions
✓ **No spam** - built-in spam protection
✓ **Reliable** - better delivery than FormSubmit
✓ **Easy setup** - just one access key needed

## Email Settings

Emails will be sent to: `edgar@fourwindsinternational.com`

Form submissions include:
- Name
- Email
- Phone
- Service requested
- Message

## Testing

After adding your access key:
1. Visit https://fourwindsintlgroup.com/#contact
2. Fill out and submit the form
3. Check `edgar@fourwindsinternational.com` inbox
4. Email should arrive within 1 minute

## Support

If you have issues, visit: https://web3forms.com/docs
