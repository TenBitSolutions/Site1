# Website Customization Guide / تخصیص کی رہنمائی

## 1️⃣ Site Name Change Karna (ویب سائٹ کا نام تبدیل کریں)

### Navigation aur Logo:
**File:** `src/app/components/Navigation.tsx`

Line 26-30 me "CreativeFlow" ko apna naam se replace karein:
```tsx
<div className="text-2xl font-bold bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
  Apka Company Name
</div>
```

### Footer me:
**File:** `src/app/components/HomePage.tsx`

Line 532-537 aur 567 me "CreativeFlow" change karein

---

## 2️⃣ Logo Add Karna (لوگو شامل کریں)

### Step 1: Logo Image Copy Karein
Apni logo image ko `src/imports/` folder me paste karein
Example: `src/imports/logo.png`

### Step 2: Navigation.tsx me Import Karein
**File:** `src/app/components/Navigation.tsx`

Top me add karein:
```tsx
import logo from '../imports/logo.png';
```

Line 26 ke aas paas replace karein:
```tsx
<Link to="/" className="flex items-center gap-2">
  <img src={logo} alt="Logo" className="h-10 w-10" />
  <div className="text-2xl font-bold">Apka Naam</div>
</Link>
```

---

## 3️⃣ Pictures/Images Update Karna (تصاویر تبدیل کریں)

### Unsplash Images Use Karna (Best Method):

Kisi bhi component me images ke liye ye MCP tool available hai.

Ya manually images add karna:

### Step 1: Images Copy Karein
`src/imports/` folder me apni images paste karein

### Step 2: Import aur Use:
```tsx
import myImage from '../imports/my-photo.jpg';

<img src={myImage} alt="Description" className="w-full h-auto" />
```

---

## 4️⃣ Colors Change Karna (رنگ تبدیل کریں)

**File:** `src/styles/theme.css`

Line 23-25 me apne colors add karein:
```css
--teal: #YOUR_COLOR;
--purple: #YOUR_COLOR;
--blue: #YOUR_COLOR;
```

---

## 5️⃣ Contact Information Update Karna

**File:** `src/app/components/HomePage.tsx`

Footer section me (around line 554-571):
- Email address
- Phone number
- Address

Change karein apni information se.

**Contact Page File:** `src/app/components/ContactPage.tsx`
Line 67-82 me bhi update karein.

---

## 6️⃣ Services Content Change Karna

**File:** `src/app/components/HomePage.tsx`

Line 123-136 me services array me apni services add/edit karein:
```tsx
const services = [
  {
    icon: Code,
    title: "Apki Service",
    description: "Description yahan likhein",
    color: "#7C3AED"
  },
  // ... more services
];
```

---

## 7️⃣ Projects/Portfolio Update Karna

**File:** `src/app/components/PortfolioPage.tsx`

Line 14-25 me projects array edit karein apne projects se.

---

## ⚠️ Important Tips:

1. **Ek file ek waqt me edit karein** - Save karein, phir dusri file kholein
2. **VS Code me errors ignore karein** agar site chal rahi hai
3. **Browser refresh karein** changes dekhne ke liye (Ctrl + R)
4. **Backup lein** edit karne se pehle

---

## 🔧 Agar Errors Aa Rahe Hain:

Terminal me ye command run karein:
```bash
# Dependencies dobara install karein
pnpm install

# Development server band karein aur phir se start karein
pnpm run dev
```

---

## 📝 Quick Reference:

| Change Kya Karna Hai | File Location |
|---------------------|---------------|
| Site Name | `Navigation.tsx`, `HomePage.tsx` |
| Logo | `Navigation.tsx` |
| Colors | `styles/theme.css` |
| Services | `HomePage.tsx`, `ServicesPage.tsx` |
| Portfolio | `PortfolioPage.tsx` |
| Contact Info | `HomePage.tsx`, `ContactPage.tsx` |
| About Content | `AboutPage.tsx` |

---

Agar koi specific cheez change karni ho to batao, main exact code deta hoon! 🚀
