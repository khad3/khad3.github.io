# 🎆 ULTRA-FLASHY BIRTHDAY SURPRISE WEBSITE 🎆

A cinematic, K-drama-style birthday surprise website with explosive fireworks, floating photos, and interactive wishes!

## 🚀 FEATURES

✨ **Opening Scene**
- Dark cinematic intro with starry night sky
- Dramatic 5-second firework build-up
- MASSIVE explosion with multi-layered particles
- Screen flash and camera shake effects
- Secondary mini fireworks

💖 **Main Content**
- Photos burst outward from explosion
- Floating photos with 3D parallax effect
- Glowing animated "HAPPY BIRTHDAY YEOBO" text
- Sparkle particles around text
- Floating heart animations

🎁 **Interactive Features**
- Birthday wish modal with glassmorphism design
- Email functionality (EmailJS or Mailto)
- Background music with unmute button
- Fully responsive (mobile & desktop)

## 📂 FILE STRUCTURE

```
your-project-folder/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript logic
├── romantic-music.mp3  # Background music (optional)
├── photo1.jpg          # Your photos
├── photo2.jpg
├── photo3.jpg
└── ...
```

## 🛠️ SETUP INSTRUCTIONS

### STEP 1: Prepare Your Photos

1. Add 6 photos (or more) to your project folder
2. Name them: `photo1.jpg`, `photo2.jpg`, etc.
3. To add/remove photos, edit `script.js` line 31:

```javascript
const PHOTOS = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg'
];
```

### STEP 2: Add Background Music (Optional)

1. Find a romantic instrumental MP3
2. Name it `romantic-music.mp3`
3. Place it in the same folder
4. Or update the filename in `index.html` line 12

### STEP 3: Configure Email Functionality

You have TWO options:

#### **OPTION A: EmailJS (Recommended)**

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a FREE account
3. Create a new service (Gmail, Outlook, etc.)
4. Create a new template with these variables:
   - `{{from_name}}` - Sender name
   - `{{to_name}}` - Recipient name
   - `{{wish}}` - The birthday wish text
5. Get your credentials from the dashboard
6. Open `script.js` and update lines 12-17:

```javascript
const EMAILJS_CONFIG = {
    enabled: true, // Change to true
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Paste your public key
    serviceId: 'YOUR_SERVICE_ID', // Paste your service ID
    templateId: 'YOUR_TEMPLATE_ID' // Paste your template ID
};
```

#### **OPTION B: Mailto (Simple)**

1. Open `script.js` lines 20-24
2. Update your email:

```javascript
const MAILTO_CONFIG = {
    enabled: true, // Already true by default
    email: 'your-email@example.com', // Replace with YOUR email
    subject: 'Birthday Wish from Yeobo'
};
```

⚠️ **Note:** Mailto opens the user's default email app. EmailJS sends directly to your inbox.

### STEP 4: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files:
   - `index.html`
   - `style.css`
   - `script.js`
   - All photo files
   - `romantic-music.mp3` (if using)
3. Go to **Settings** → **Pages**
4. Select **main branch** as source
5. Save and wait 2-3 minutes
6. Your site will be live at: `https://yourusername.github.io/repository-name/`

## 🎨 CUSTOMIZATION

### Change Birthday Text

Edit `index.html` line 26:
```html
<h1 class="birthday-title">HAPPY BIRTHDAY YEOBO</h1>
```

### Adjust Colors

Edit `style.css`:
- Line 23-29: Background gradient
- Line 220-221: Title colors
- Line 358-359: Button colors

### Change Animation Speed

Edit `script.js`:
- Line 118: Firework speed
- Line 215: Photo burst timing
- Line 299: Heart spawn rate

## 📱 MOBILE RESPONSIVE

✅ Automatically adjusts for:
- Phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🎭 BROWSER COMPATIBILITY

✅ Works on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 🐛 TROUBLESHOOTING

### Photos Not Showing?
- Check file names match exactly (case-sensitive)
- Ensure photos are in the same folder as `index.html`
- Check browser console for errors (F12)

### Firework Not Animating?
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito mode
- Check if JavaScript is enabled

### Email Not Sending?
- Verify EmailJS credentials
- Check spam folder
- Try mailto method instead

### Music Not Playing?
- Browsers require user interaction first
- Click the "Unmute" button
- Check audio file path

## 💡 TIPS

1. **Test locally first** - Open `index.html` in browser before deploying
2. **Optimize images** - Compress photos to 500KB or less for faster loading
3. **Use HTTPS** - GitHub Pages provides this automatically
4. **Share via QR code** - Generate at [qr-code-generator.com](https://www.qr-code-generator.com/)

## 🎬 DEMO FLOW

1. User opens link → Dark starry screen
2. Golden firework rises (5 seconds)
3. MASSIVE EXPLOSION with effects
4. Photos burst outward + float
5. "HAPPY BIRTHDAY YEOBO" fades in
6. User clicks "Make a Birthday Wish"
7. Modal opens with wish form
8. Submits wish → Success message

## 📄 LICENSE

Free to use for personal projects!

## 💖 MADE WITH LOVE

Created for unforgettable birthday surprises! 🎂✨

---

**Need help?** Check the code comments - everything is clearly labeled!

**Want to go even MORE flashy?** Add more photos, increase particle counts, or extend explosion duration in `script.js`!

Enjoy! 🎉
