<!-- SCHEMA -->

Enum "question_category" {
"onboarding" // asked during signup
"personalization" // asked after onboarding (optional or progressive)
}

Enum "question_type" {
"single_choice" // can select only one answer
"multi_choice" // can select multiple answers
"text" // answer is text like message
"scale"
}

Enum "processing_type" {
"direct" // No processing; answer saved as-is
"ai" // Requires AI to interpret the answer
"custom" // For future extensibility (e.g., rules-based logic)
}

Enum "question_stage" {
"onboarding" // Asked at sign-up
"personalization" // Asked later for better recs
"both" // Available for either
}

Table "questions" {
"id" string [primary key]
"question_text" string [not null]
"question_type" "question_type" [not null]
"category" "question_category" [not null]
"options" string[] [note: "Only for choice-type questions"]
"target_field" string [not null, note: "e.g. 'interests', 'goals', 'learning_style'"]
"user_types" string[] [not null, note: "Limit to students, companies, etc."]
"order" integer [not null]
"active" boolean [default: true]
"processing_type" "processing_type" [default: "direct"]
"stage" "question_stage" [default: "onboarding"]
"created_at" timestamp
"updated_at" timestamp
}

For Students (Choosing a College Program)
Q1. Which activities sound most fun to you?

- Designing or creating something new
- Solving puzzles, fixing gadgets, or coding
- Leading projects or persuading others
- Helping friends or teaching others
- Organizing schedules or data
  Q2. Which school subjects do you enjoy most?
- Arts / Literature
- Math / Science
- Social Studies / Leadership activities
- PE / Volunteering / Helping roles
- Business / Economics
  Q3. What kind of skills do you feel most confident in?
- Creativity / Expression
- Problem-solving / Analysis
- Communication / Leadership
- Caring / Mentoring
- Organization / Planning
  Q4. What’s most important for your future career?
- High salary
- Job stability
- Creativity and freedom
- Helping others / Making impact
- Prestige / Recognition
  Q5. How do you like to learn best?
- Trying it myself first
- Working with classmates / mentors
- Watching examples then copying
- Following clear step-by-step instructions
  Q6. In the next 5 years, I’d like to…
- Start a business or project
- Get a stable job right after graduation
- Take more studies / certifications
- Explore different paths until I find my fit

For Working Adults (Career Switch or Upskill)
Q1. Which part of your current work do you enjoy most?

- Creating / designing ideas
- Solving problems with tools or data
- Leading teams / making decisions
- Supporting others / customer service
- Organizing / streamlining processes
  Q2. Which part feels least “you”?
- Routine / repetitive work
- Technical tasks
- Leadership roles
- People-facing tasks
- Creative work
  Q3. What motivates you most now?
- Higher income
- Work-life balance
- Learning and growth
- Social impact / purpose
- Prestige / recognition
  Q4. What environment do you prefer?
- Independent work
- Team collaboration
- Leadership & decision-making
- Research and analysis
- Helping/support roles
  Q5. Which skill would you most like to strengthen?
- Technical / digital
- Communication / leadership
- Creativity / innovation
- People / service skills
- Organization / management
  Q6. In the next 2–3 years, I’d like to…
- Shift careers completely
- Move up in my current field
- Start my own venture
- Pursue further studies or certifications
- Explore options until I find a good fit
