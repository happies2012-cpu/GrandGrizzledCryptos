from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
import mimetypes
from urllib.parse import urlparse, parse_qs

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "templates")

INDUSTRIES = {
    "healthcare": {
        "name": "Healthcare & Medical",
        "icon": "🏥",
        "color": "#10b981",
        "themes": ["Clinical Dashboard", "Patient Portal", "Medical Records", "Pharmacy System", "Telemedicine"],
        "pages": ["Dashboard", "Patient List", "Patient Profile", "Appointments", "Medical Records", "Lab Results",
                  "Prescriptions", "Billing", "Reports", "Staff Management", "Telemedicine", "Emergency", "Inventory",
                  "Settings", "Notifications", "Analytics", "Insurance", "Referrals", "Audit Log", "Help Center"]
    },
    "ecommerce": {
        "name": "E-Commerce & Retail",
        "icon": "🛒",
        "color": "#f59e0b",
        "themes": ["Marketplace", "Fashion Store", "Electronics Shop", "Grocery Platform", "Luxury Brand"],
        "pages": ["Home", "Product Catalog", "Product Detail", "Category Browse", "Search Results", "Cart",
                  "Checkout", "Order Confirmation", "Order History", "Order Tracking", "User Profile",
                  "Wishlist", "Reviews", "Seller Dashboard", "Inventory", "Analytics", "Promotions",
                  "Customer Support", "Returns", "Loyalty Program"]
    },
    "fintech": {
        "name": "Fintech & Banking",
        "icon": "💳",
        "color": "#6366f1",
        "themes": ["Digital Bank", "Investment Platform", "Payment Gateway", "Insurance Portal", "Crypto Exchange"],
        "pages": ["Dashboard", "Accounts", "Transactions", "Send Money", "Receive Money", "Investments",
                  "Savings Goals", "Budget Planner", "Loans", "Credit Score", "Cards", "Statements",
                  "Analytics", "Security", "KYC Verification", "Settings", "Notifications", "Support",
                  "Offers", "Referrals"]
    },
    "edtech": {
        "name": "EdTech & Learning",
        "icon": "🎓",
        "color": "#8b5cf6",
        "themes": ["Online University", "Skill Platform", "Kids Learning", "Corporate Training", "Language App"],
        "pages": ["Home", "Course Catalog", "Course Detail", "Lesson Player", "Quiz", "Assignment",
                  "Progress Tracker", "Certificates", "Discussion Forum", "Live Class", "Student Dashboard",
                  "Instructor Dashboard", "Grades", "Schedule", "Resources", "Leaderboard", "Community",
                  "Settings", "Notifications", "Support"]
    },
    "saas": {
        "name": "SaaS & Productivity",
        "icon": "⚡",
        "color": "#ec4899",
        "themes": ["Project Manager", "CRM Platform", "Analytics Dashboard", "HR System", "DevOps Tool"],
        "pages": ["Dashboard", "Projects", "Tasks", "Kanban Board", "Calendar", "Team Members", "Reports",
                  "Integrations", "Workflows", "Documents", "Time Tracking", "Invoices", "Settings",
                  "Billing", "API Keys", "Audit Logs", "Notifications", "Help Desk", "Onboarding", "Profile"]
    },
    "realestate": {
        "name": "Real Estate",
        "icon": "🏠",
        "color": "#14b8a6",
        "themes": ["Property Marketplace", "Rental Platform", "Agent Portal", "Commercial Real Estate", "Vacation Rentals"],
        "pages": ["Home", "Property Search", "Property Detail", "Map View", "Favorites", "Compare Properties",
                  "Virtual Tour", "Agent Profile", "Agency Listing", "Mortgage Calculator", "Neighborhood Guide",
                  "Schedule Visit", "Contact Agent", "My Properties", "Listing Manager", "Analytics",
                  "CRM", "Documents", "Settings", "Support"]
    },
    "social": {
        "name": "Social & Community",
        "icon": "💬",
        "color": "#f97316",
        "themes": ["Social Network", "Community Forum", "Creator Platform", "Dating App", "Event Platform"],
        "pages": ["Feed", "Explore", "Profile", "Followers", "Following", "Stories", "Messages", "Notifications",
                  "Groups", "Events", "Marketplace", "Live Stream", "Reels", "Create Post", "Saved",
                  "Settings", "Privacy", "Analytics", "Monetization", "Help"]
    },
    "logistics": {
        "name": "Logistics & Supply Chain",
        "icon": "🚚",
        "color": "#64748b",
        "themes": ["Fleet Manager", "Warehouse System", "Delivery Tracker", "Import/Export", "Last Mile"],
        "pages": ["Dashboard", "Shipments", "Tracking", "Fleet", "Drivers", "Routes", "Warehouses",
                  "Inventory", "Orders", "Customers", "Suppliers", "Reports", "Analytics", "Billing",
                  "Compliance", "Alerts", "Settings", "API", "Help", "Audit"]
    }
}

def get_html():
    with open(os.path.join(TEMPLATES_DIR, "index.html"), "r", encoding="utf-8") as f:
        return f.read()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/industries":
            self.json_response(INDUSTRIES)
            return

        if path == "/api/generate":
            qs = parse_qs(parsed.query)
            industry = qs.get("industry", ["saas"])[0]
            theme_idx = int(qs.get("theme", [0])[0])
            data = INDUSTRIES.get(industry, INDUSTRIES["saas"])
            theme = data["themes"][theme_idx] if theme_idx < len(data["themes"]) else data["themes"][0]
            result = {
                "industry": data["name"],
                "theme": theme,
                "pages": data["pages"],
                "color": data["color"],
                "prompt": self.build_prompt(data["name"], theme, data["pages"])
            }
            self.json_response(result)
            return

        if path == "/health":
            self.json_response({"status": "healthy"})
            return

        if path.startswith("/static/"):
            self.serve_static(path[1:])
            return

        self.serve_html()

    def build_prompt(self, industry, theme, pages):
        return f"""Build a complete, production-ready {industry} application with the "{theme}" design theme.

TECH STACK:
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + PostgreSQL
- Auth: JWT with role-based access control
- State: Redux Toolkit + RTK Query

REQUIRED PAGES ({len(pages)} total):
{chr(10).join(f"  {i+1}. {p}" for i, p in enumerate(pages))}

DESIGN REQUIREMENTS:
- Glassmorphism UI with blur effects and transparency
- Full dark + light mode with smooth transition
- Mobile-first responsive design
- Animated micro-interactions (Framer Motion)
- Professional {industry} color palette and typography

FEATURES:
- User authentication (login, signup, forgot password, 2FA)
- Role-based access control (Admin, Manager, User)
- Real-time notifications via WebSockets
- Full CRUD for all entities
- Advanced search and filtering
- Data visualization and analytics charts
- File upload and management
- Email notifications
- Audit logging
- Export data (CSV, PDF)
- Settings and profile management
- Dark/light mode persistence

PRODUCTION REQUIREMENTS:
- Zero console errors
- Proper error boundaries and loading states
- Form validation with Zod
- API error handling
- Security headers and rate limiting
- Optimized bundle with code splitting
- Accessibility (WCAG 2.1 AA)"""

    def serve_html(self):
        try:
            content = get_html().encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, str(e))

    def serve_static(self, rel_path):
        full_path = os.path.join(os.path.dirname(__file__), rel_path)
        if not os.path.exists(full_path) or not os.path.isfile(full_path):
            self.send_error(404)
            return
        mime, _ = mimetypes.guess_type(full_path)
        with open(full_path, "rb") as f:
            data = f.read()
        self.send_response(200)
        self.send_header("Content-Type", mime or "application/octet-stream")
        self.end_headers()
        self.wfile.write(data)

    def json_response(self, data):
        body = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    print("Server running on http://0.0.0.0:5000")
    HTTPServer(("0.0.0.0", 5000), Handler).serve_forever()
