from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse

prompts_data = {
    "initial_prompts": {
        "title": "Initial App Generation",
        "icon": "rocket",
        "items": [
            {
                "name": "System Message (Foundation Layer)",
                "description": "Sets up the AI as an expert developer",
                "template": """You are an expert full-stack developer specializing in [React/Python/Node.js]. 
Your role is to build production-ready applications with:
- Clean, modular, well-documented code
- Modern UI/UX best practices
- Proper error handling and validation
- Security best practices
- Scalable architecture
- Database integration where needed

Always follow SOLID principles and write code that is maintainable and extensible."""
            },
            {
                "name": "Technical Specifications",
                "description": "Define your tech stack and standards",
                "template": """Technical Stack:
- Frontend: [React 18+ / Next.js 14+ / Vue 3+]
- Backend: [Node.js + Express / Python + Flask/Django / FastAPI]
- Database: [PostgreSQL / MongoDB / SQLite]
- Styling: [Tailwind CSS / Material-UI / Bootstrap]
- Authentication: [JWT / OAuth / Session-based]
- State Management: [Redux / Zustand / Context API]

Code Standards:
- Use TypeScript for type safety (if applicable)
- Implement async/await for asynchronous operations
- Use environment variables for sensitive data
- Follow RESTful API design principles
- Implement proper error boundaries
- Add loading states and user feedback
- Make all components responsive (mobile-first)"""
            },
            {
                "name": "App Request Template",
                "description": "How to request your app",
                "template": """Build me a [APP_TYPE] with the following features:

Core Features:
1. [Feature 1 - be specific]
2. [Feature 2 - be specific]
3. [Feature 3 - be specific]

User Roles:
- [Role 1]: Can [permissions]
- [Role 2]: Can [permissions]

Data Structure:
- [Entity 1]: [fields and types]
- [Entity 2]: [fields and types]

Design Requirements:
- [Color scheme / theme]
- [Layout preferences]
- [Specific UI elements needed]"""
            }
        ]
    },
    "iteration_prompts": {
        "title": "Iteration Prompts",
        "icon": "refresh",
        "items": [
            {
                "name": "Feature Addition",
                "description": "Add new functionality to existing app",
                "template": """Add [FEATURE_NAME] that allows users to [SPECIFIC_ACTION]. 
This should:
- [Requirement 1]
- [Requirement 2]
- Integrate with existing [component/API]
- Store data in [database table/collection]
- Include validation for [specific fields]"""
            },
            {
                "name": "Database & Backend",
                "description": "Design backend logic and API endpoints",
                "template": """Create a backend system for [FEATURE] with:

Database Schema:
- Table/Collection: [name]
- Fields: [field1: type, field2: type]
- Relationships: [define foreign keys/references]
- Indexes: [fields that need indexing]

API Endpoints:
- POST /api/[resource] - [description]
- GET /api/[resource] - [description]
- PUT /api/[resource]/:id - [description]
- DELETE /api/[resource]/:id - [description]

Business Logic:
- [Rule 1]
- [Rule 2]
- [Validation requirements]"""
            },
            {
                "name": "UI/UX Enhancement",
                "description": "Improve interface and user experience",
                "template": """Redesign the [COMPONENT/PAGE] with:

Visual Design:
- Color palette: [primary, secondary, accent colors]
- Typography: [font families, sizes, weights]
- Spacing: [tight/normal/loose]
- Style: [modern/minimal/corporate/playful]

Interaction Design:
- Add [animations/transitions] for [actions]
- Implement [hover effects/focus states]
- Include [loading indicators/skeleton screens]
- Add [tooltips/help text] for [elements]

Accessibility:
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus indicators"""
            },
            {
                "name": "Authentication & Authorization",
                "description": "Implement secure auth systems",
                "template": """Implement [AUTH_TYPE] authentication with:

Authentication Methods:
- [Email/password / OAuth / Magic links / 2FA]
- Password requirements: [min length, complexity rules]
- Session management: [JWT/cookies/session storage]

User Roles & Permissions:
- Role: [name] - Permissions: [list]
- Role: [name] - Permissions: [list]

Protected Routes:
- [Route 1]: Requires [role/permission]
- [Route 2]: Requires [role/permission]

Security Features:
- Rate limiting on login attempts
- Email verification
- Password reset flow
- Remember me functionality
- Logout from all devices"""
            },
            {
                "name": "API Integration",
                "description": "Connect to external services",
                "template": """Integrate [SERVICE/API] to:

API Details:
- Endpoint: [URL]
- Authentication: [API key/OAuth/Bearer token]
- Rate limits: [requests per minute]

Data Flow:
- Fetch [data type] from [source]
- Transform data: [mapping/filtering/aggregation]
- Store in: [database/state/cache]
- Display as: [component/visualization]

Error Handling:
- Handle [specific error scenario]
- Implement retry logic for [failure types]
- Show user-friendly error messages"""
            },
            {
                "name": "Performance Optimization",
                "description": "Make your app faster",
                "template": """Optimize [COMPONENT/FEATURE] for better performance:

Issues to Address:
- [Slow loading / Memory leaks / Excessive re-renders]
- [Large bundle size / N+1 queries / Unoptimized images]

Optimization Techniques:
- Implement [lazy loading/code splitting/memoization]
- Add [caching/pagination/virtual scrolling]
- Optimize [database queries/API calls/asset loading]

Metrics to Improve:
- Reduce [metric] from [current] to [target]
- Improve [First Contentful Paint/Time to Interactive]"""
            },
            {
                "name": "Testing & Debugging",
                "description": "Fix bugs and ensure quality",
                "template": """Fix/Test [FEATURE/BUG]:

Bug Description:
- What's happening: [observed behavior]
- Expected behavior: [what should happen]
- Steps to reproduce: [detailed steps]
- Error messages: [exact error text]

Testing Requirements:
- Unit tests for [functions/components]
- Integration tests for [workflows]
- Edge cases to cover: [scenarios]

Validation Needed:
- Input validation for [fields]
- Error handling for [scenarios]
- Cross-browser testing
- Mobile responsiveness"""
            },
            {
                "name": "Deployment & DevOps",
                "description": "Prepare for production",
                "template": """Prepare [APP] for production deployment:

Environment Configuration:
- Setup [environment] variables for [services]
- Configure [production/staging/development] environments
- Set up [database connection/API keys/secrets]

Deployment Requirements:
- Platform: [Replit/Vercel/AWS/Heroku]
- Domain: [custom domain setup if needed]
- SSL/HTTPS configuration
- CDN for static assets

Monitoring & Logging:
- Add error tracking with [service]
- Implement logging for [events]
- Set up health checks
- Performance monitoring"""
            }
        ]
    },
    "app_types": {
        "title": "Specialized App Types",
        "icon": "grid",
        "items": [
            {
                "name": "E-Commerce Platform",
                "description": "Full shopping experience",
                "template": """Build a full e-commerce platform with:
- Product catalog with categories, search, filters
- Shopping cart with add/remove/update quantities
- User authentication and order history
- Checkout flow with Stripe integration
- Admin panel for product/order management
- Email notifications for orders
- Inventory tracking
- Review and rating system

Enhancement Ideas:
1. Add wishlist functionality with share feature
2. Implement coupon/discount code system
3. Add product recommendations based on browsing history
4. Create analytics dashboard for sales metrics
5. Add multi-currency support"""
            },
            {
                "name": "Social Media App",
                "description": "Connect and share content",
                "template": """Build a social networking app with:
- User profiles with bio, avatar, followers/following
- Create posts with text, images, videos
- Like, comment, share functionality
- Real-time notifications
- Direct messaging between users
- Hashtag and mention support
- Feed algorithm showing relevant posts
- Privacy settings for posts

Enhancement Ideas:
1. Add stories feature with 24-hour expiry
2. Implement real-time chat with typing indicators
3. Add video/audio call functionality
4. Create trending topics section
5. Add content moderation and reporting system"""
            },
            {
                "name": "Project Management Tool",
                "description": "Organize teams and tasks",
                "template": """Build a project management tool with:
- Projects with tasks, subtasks, milestones
- Kanban board and list views
- User assignment and role management
- Due dates and priority levels
- Comments and file attachments
- Activity timeline and notifications
- Dashboard with project analytics
- Time tracking for tasks

Enhancement Ideas:
1. Add Gantt chart view for project timeline
2. Implement calendar integration (Google/Outlook)
3. Add resource allocation and capacity planning
4. Create automated workflow rules and triggers
5. Add reporting with custom filters and exports"""
            },
            {
                "name": "Learning Management System",
                "description": "Educational platform",
                "template": """Build an LMS platform with:
- Course creation with modules and lessons
- Video hosting and streaming
- Quizzes and assignments with grading
- Student progress tracking
- Discussion forums per course
- Certificates upon completion
- Instructor dashboard with analytics
- Student enrollment and payment system

Enhancement Ideas:
1. Add live class feature with video conferencing
2. Implement gamification with points and badges
3. Add AI-powered course recommendations
4. Create peer review system for assignments
5. Add mobile app support with offline access"""
            }
        ]
    },
    "debugging": {
        "title": "Debugging & Refinement",
        "icon": "bug",
        "items": [
            {
                "name": "Fix Something That's Broken",
                "description": "Report and fix bugs",
                "template": """The [FEATURE] is not working correctly. Specifically:
- What I did: [steps]
- What happened: [actual result]
- What should happen: [expected result]
- Error messages: [exact error text]
- Browser console logs: [any errors shown]

Please debug and fix this issue."""
            },
            {
                "name": "Get Code Explanation",
                "description": "Understand how code works",
                "template": """Explain how [COMPONENT/FUNCTION] works:
- What does this code do?
- Why was it implemented this way?
- What are the key dependencies?
- Are there any potential issues or limitations?
- How can I modify it to [specific change]?"""
            },
            {
                "name": "Request Best Practices Review",
                "description": "Get improvement suggestions",
                "template": """Review the [COMPONENT/FEATURE] and suggest improvements for:
- Code quality and readability
- Performance optimization
- Security vulnerabilities
- Accessibility compliance
- Error handling
- User experience

Provide specific code changes with explanations."""
            }
        ]
    },
    "quick_templates": {
        "title": "Quick Templates",
        "icon": "zap",
        "items": [
            {
                "name": "Quick Feature Add",
                "description": "Fast feature request",
                "template": """Add [FEATURE] that lets users [ACTION]. 
Should include [requirements]. 
Style it to match the existing [component]."""
            },
            {
                "name": "Quick Bug Fix",
                "description": "Fast bug report",
                "template": """Fix: [DESCRIBE BUG]. 
Happens when [STEPS]. 
Should do [EXPECTED] instead."""
            },
            {
                "name": "Quick Style Update",
                "description": "Fast styling change",
                "template": """Update [COMPONENT] styling:
- Change [color/size/layout]
- Add [animation/effect]
- Make it [modern/minimal/bold]"""
            },
            {
                "name": "Quick API Integration",
                "description": "Fast API connection",
                "template": """Connect to [API] at [endpoint].
Fetch [data type].
Display as [component].
Handle [error scenarios]."""
            }
        ]
    }
}

best_practices = {
    "do": [
        "Be specific about requirements",
        "Provide examples and context",
        "Specify technical constraints",
        "Mention edge cases to handle",
        "Request error handling explicitly",
        "Ask for responsive design",
        "Include accessibility requirements",
        "Specify data validation rules"
    ],
    "dont": [
        "Use vague terms like 'make it better'",
        "Request too many features at once",
        "Ignore existing code structure",
        "Skip testing requirements",
        "Forget about mobile users",
        "Overlook security considerations",
        "Neglect error scenarios"
    ]
}

html = """<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>AI Prompt Framework</title>
  <style>
    body { font-family: Arial, sans-serif; background:#0f172a; color:#e2e8f0; margin:0; padding:24px; }
    .card { background:#1e293b; border:1px solid #334155; border-radius:16px; padding:20px; margin-bottom:16px; }
    h1,h2,h3 { margin-top:0; }
    pre { white-space: pre-wrap; background:#0b1220; padding:16px; border-radius:12px; overflow:auto; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:16px; }
    .muted { color:#94a3b8; }
    .pill { display:inline-block; padding:6px 10px; border-radius:999px; background:#6366f1; margin-right:8px; }
    a { color:#93c5fd; }
  </style>
</head>
<body>
  <h1>AI Prompt Framework</h1>
  <p class=\"muted\">Interactive reference for prompt templates and best practices.</p>
  <div class=\"card\">
    <h2>Available Sections</h2>
    <p>Initial Prompts, Iteration Prompts, Specialized App Types, Debugging & Refinement, Quick Templates</p>
  </div>
  <h2>Best Practices</h2>
  <div class=\"grid\">
    <div class=\"card\"><h3>DO</h3><ul>""" + "".join(f"<li>{x}</li>" for x in best_practices["do"]) + """</ul></div>
    <div class=\"card\"><h3>DON'T</h3><ul>""" + "".join(f"<li>{x}</li>" for x in best_practices["dont"]) + """</ul></div>
  </div>
  <h2>Templates</h2>
  """ + "".join(
    f'<div class="card"><h3>{section["title"]}</h3>' + "".join(
      f'<div class="card"><h4>{item["name"]}</h4><p class="muted">{item["description"]}</p><pre>{item["template"]}</pre></div>'
      for item in section["items"]
    ) + '</div>'
    for section in prompts_data.values()
  ) + """
  <div class=\"card\"><h2>Health</h2><p>OK</p></div>
</body>
</html>"""

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/prompts":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(prompts_data).encode())
            return
        if parsed.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy"}).encode())
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())

if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 5000), Handler).serve_forever()
