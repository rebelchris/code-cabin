import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Calendar, TreePine, Mountain, Coffee } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample story data - in a real app this would come from a CMS or database
const stories = {
  "why-1on1s-matter": {
    title: "The Day I Learned Why 1:1s Aren't Just Status Updates",
    category: "Stories from the Trenches",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    content: `
# The Day I Learned Why 1:1s Aren't Just Status Updates

*Pull up a chair by the fire. This is a story about the moment everything clicked.*

## The Setup

Three years into my first management role, I thought I had 1:1s figured out. Every week, like clockwork, I'd sit down with each team member and run through the same agenda:

- How's your current sprint going?
- Any blockers I can help with?
- Questions about the upcoming release?

Efficient. Professional. Completely missing the point.

## The Moment Everything Changed

Sarah had been on my team for eight months. Solid engineer, always delivered on time, never complained. In our 1:1s, she'd give me the updates I wanted and we'd wrap up in 15 minutes. I congratulated myself on having such a low-maintenance team member.

Then she put in her two weeks' notice.

I was blindsided. "But you never mentioned being unhappy," I said, probably sounding as confused as I felt.

Her response still echoes in my head: *"You never asked."*

## What I Learned

That conversation taught me that 1:1s aren't status meetings—they're relationship meetings. They're not about the work; they're about the person doing the work.

Here's what I wish I'd known earlier:

### 1. Start with the Human

Instead of diving into project updates, I now start every 1:1 with: "How are you doing?" And then I actually listen to the answer. Not the polite "fine" answer, but the real one underneath.

### 2. Ask Better Questions

- What's energizing you right now?
- What's draining your energy?
- What would you like to be doing more of?
- What would you like to be doing less of?
- How can I better support you?

### 3. Make It Safe

The best 1:1s happen when people feel safe to be vulnerable. That means admitting when I don't know something, sharing my own struggles, and never, ever using what someone tells me against them.

## The Framework That Actually Works

After years of iteration, here's my current 1:1 structure:

**Check-in (5 minutes):** How are you really doing?
**Growth (10 minutes):** What are you learning? What do you want to learn?
**Challenges (10 minutes):** What's frustrating you? How can I help?
**Recognition (5 minutes):** What wins should we celebrate?
**Forward-looking (5 minutes):** What are you excited about?

Notice what's missing? Status updates. Those belong in standups and Slack.

## The Ripple Effect

When I shifted my approach, everything changed. Team members started bringing me problems before they became crises. They shared career aspirations I never knew they had. They told me when they were struggling with work-life balance, family issues, or imposter syndrome.

Most importantly, they stayed. Not just physically, but mentally and emotionally engaged.

## Your Turn

If you're a manager reading this, I challenge you to audit your last five 1:1s:

- How much time did you spend on status vs. the person?
- What did you learn about your team member as a human being?
- Did they leave feeling heard and supported?

If the answers make you uncomfortable, you're not alone. I've been there. The good news is that it's never too late to change course.

## The Bottom Line

1:1s are your most powerful tool as a manager, but only if you use them right. They're not about getting information—they're about building relationships. They're not about efficiency—they're about effectiveness.

And sometimes, they're about preventing really good people from walking out the door because they never felt like you cared about them as more than a resource.

*What's your 1:1 story? I'd love to hear it. Drop me a line—the cabin door is always open.*
    `,
  },
  "saying-no-framework": {
    title: "The Art of Saying No: Protecting Your Team's Focus",
    category: "Practical Tools",
    date: "Dec 8, 2024",
    readTime: "12 min read",
    content: `
# The Art of Saying No: Protecting Your Team's Focus

*Sometimes the most important thing a leader can do is be the shield between their team and the chaos.*

## The Problem

Every engineering manager knows this feeling: your team is finally hitting their stride, making real progress on the roadmap, and then... the requests start flooding in.

"Can we just add this one small feature?"
"The CEO wants a quick prototype by Friday."
"Marketing needs this integration for their campaign."
"It's just a tiny change, shouldn't take long."

Before you know it, your focused, productive team is scattered across a dozen different priorities, context-switching constantly, and delivering nothing particularly well.

Sound familiar? Let me share the framework that saved my sanity and my team's productivity.

## The "No" Framework

### Step 1: The Pause
Never say yes immediately. Even if it seems like a great idea, always respond with: "Let me think about this and get back to you by [specific time]."

This gives you space to evaluate properly and shows respect for the request.

### Step 2: The Filter Questions
Before saying yes to anything, I run it through these five questions:

1. **Does this align with our current quarter's goals?**
2. **What would we have to stop doing to make room for this?**
3. **Who is the actual customer for this request?**
4. **What happens if we don't do this at all?**
5. **Is this the right team to build this?**

### Step 3: The Response Framework
Based on the answers, I have four standard responses:

**The Strategic No:** "This doesn't align with our current priorities. Let's revisit in Q2."

**The Redirect:** "This is important, but Team X is better positioned to handle it."

**The Negotiate:** "We can do this, but it means delaying Project Y by two weeks."

**The Conditional Yes:** "We can explore this after we ship our current milestone."

## Real Examples

Let me share some actual situations where this framework saved us:

### The CEO's "Quick" Request
**Request:** CEO wanted a customer-facing analytics dashboard "by end of week" for a board meeting.

**Filter Results:** 
- Didn't align with our API stability goals
- Would require stopping critical bug fixes
- Real customer was the board, not our users
- Delaying wouldn't impact actual customers
- Our team wasn't the right fit (needed more frontend expertise)

**Response:** "I understand the urgency for the board meeting. The design team can create mockups by Friday, and we can build the real thing in Q2 when it aligns with our customer dashboard initiative."

**Outcome:** CEO got what he needed for the presentation, team stayed focused, and we built a better solution later.

### The "Simple" Integration
**Request:** Sales wanted integration with a new CRM tool that "only takes an hour to set up."

**Filter Results:**
- Didn't align with our platform stability goals
- Would require stopping security improvements
- Customer was internal sales team
- Not doing it meant manual data entry
- We were the only team who could do it

**Response:** "I can see how this would help the sales team. It's actually a 2-week project when you include testing and monitoring. We can start it after we finish the security audit, or we can prioritize it now and push the audit to next month. What's more important?"

**Outcome:** Sales chose to wait, understanding the real tradeoffs.

## The Scripts That Work

Here are the exact phrases I use:

### For Stakeholders:
- "I want to make sure we're solving the right problem. Can you help me understand the underlying need?"
- "This sounds important. What would success look like?"
- "We're committed to delivering X this quarter. If we take this on, we'd need to delay Y. Is that the right tradeoff?"

### For Your Team:
- "I know this request seems urgent, but our job is to deliver on our commitments first."
- "I'm going to push back on this so you can focus on what matters."
- "Let me handle the politics. You focus on the code."

### For Your Manager:
- "I want to make sure I'm prioritizing correctly. Can you help me understand how this fits with our quarterly goals?"
- "I'm concerned about the impact on team velocity. Here's what we'd need to stop doing..."

## The Hardest Part

The hardest "no" to say is to yourself. As managers, we want to help everyone, solve every problem, and make everyone happy. But saying yes to everything is saying no to focus, quality, and your team's sanity.

Remember: every yes is a no to something else. Make sure you're choosing consciously.

## Building Your Own Framework

Here's how to adapt this for your context:

1. **Define your team's current priorities** (write them down!)
2. **Create your own filter questions** based on your goals
3. **Practice the scripts** until they feel natural
4. **Track your decisions** to see patterns
5. **Adjust based on what works**

## The Results

After implementing this framework:
- Team velocity increased by 40%
- Context switching decreased dramatically
- Team satisfaction scores improved
- We actually delivered on our quarterly commitments
- Stakeholders started thinking more carefully before making requests

## Your Turn

What requests are you saying yes to that you should be saying no to? What would your team accomplish if they had uninterrupted focus for just one month?

The art of saying no isn't about being difficult—it's about being strategic. Your team is counting on you to protect their focus so they can do their best work.

*What's your biggest challenge with saying no? Let's talk about it.*
    `,
  },
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug as keyof typeof stories]

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <TreePine className="h-8 w-8" />
                <Mountain className="h-6 w-6 opacity-70" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-heading tracking-tight">CodeCabin.dev</h1>
                <p className="text-sm opacity-90 mt-1 font-medium">Where engineering leaders gather</p>
              </div>
            </Link>
            <Link href="/stories">
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Stories
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="rounded-full px-4 py-2 font-medium mb-6">
              {story.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">{story.title}</h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{story.readTime}</span>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <Coffee className="h-12 w-12 text-primary opacity-60" />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="leading-relaxed text-foreground"
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
              }}
              dangerouslySetInnerHTML={{
                __html: story.content
                  .split("\n")
                  .map((line) => {
                    if (line.startsWith("# ")) {
                      return `<h1 class="text-4xl font-black font-heading mb-8 mt-12 text-foreground">${line.slice(2)}</h1>`
                    }
                    if (line.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold font-heading mb-6 mt-10 text-foreground">${line.slice(3)}</h2>`
                    }
                    if (line.startsWith("### ")) {
                      return `<h3 class="text-xl font-bold font-heading mb-4 mt-8 text-foreground">${line.slice(4)}</h3>`
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return `<h4 class="text-lg font-semibold mb-3 mt-6 text-primary">${line.slice(2, -2)}</h4>`
                    }
                    if (line.startsWith("*") && line.endsWith("*") && !line.includes("**")) {
                      return `<p class="italic text-muted-foreground mb-6 text-center border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">${line.slice(1, -1)}</p>`
                    }
                    if (line.startsWith("- ")) {
                      return `<li class="mb-2 text-foreground">${line.slice(2)}</li>`
                    }
                    if (line.trim() === "") {
                      return "<br>"
                    }
                    return `<p class="mb-6 text-foreground">${line}</p>`
                  })
                  .join(""),
              }}
            />
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <div className="bg-muted/50 rounded-2xl p-8 mb-8">
                <Coffee className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-4">
                  Enjoyed this story? There's more where that came from.
                </p>
                <Link href="/stories">
                  <Button size="lg" className="rounded-xl">
                    Read More Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
