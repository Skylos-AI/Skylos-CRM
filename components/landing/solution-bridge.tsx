"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { SectionBadge } from "@/components/ui/section-badge"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"

interface LeaderAction {
    company: string
    action: string
    result: string
    timeframe: string
}

export function SolutionBridge() {
    const leaderActions: LeaderAction[] = [
        {
            company: "Industry Leaders",
            action: "Deployed AI agents for customer service",
            result: "40% cost reduction, 24/7 availability",
            timeframe: "Last 6 months"
        },
        {
            company: "Forward-thinking Companies",
            action: "Automated repetitive inquiries",
            result: "Teams focus on complex problems",
            timeframe: "This quarter"
        },
        {
            company: "Smart Businesses",
            action: "Integrated conversational AI",
            result: "Scale without hiring bottlenecks",
            timeframe: "Right now"
        }
    ]

    return (
        <div className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-600 rounded-full blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                <ScrollTriggeredSection animationType="fadeIn">
                    <div className="text-center mb-12">
                        <SectionBadge text="THE SOLUTION" className="mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            While Your Competitors Gain Ground,
                            <span className="block text-blue-600 mt-2">
                                Industry Leaders Are Implementing This
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The companies pulling ahead aren't waiting. They're deploying conversational AI
                            to automate operations, reduce costs, and scale without limits.
                        </p>
                    </div>
                </ScrollTriggeredSection>

                <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
                    {leaderActions.map((action, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    {index === 0 && <TrendingUp className="w-6 h-6 text-blue-600" />}
                                    {index === 1 && <Users className="w-6 h-6 text-blue-600" />}
                                    {index === 2 && <Zap className="w-6 h-6 text-blue-600" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{action.company}</h3>
                                    <p className="text-sm text-gray-500">{action.timeframe}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-3">{action.action}</p>
                            <p className="text-sm font-medium text-green-600">{action.result}</p>
                        </div>
                    ))}
                </StaggerContainer>

                <ScrollTriggeredSection animationType="fadeInUp">
                    <div className="text-center bg-blue-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            The Question Isn't Whether AI Will Transform Your Industry
                        </h3>
                        <p className="text-lg text-gray-700 mb-6">
                            It's whether you'll be leading the transformation or scrambling to catch up.
                        </p>
                        <div className="flex items-center justify-center text-blue-600 font-medium">
                            <span>Here's how the leaders are doing it</span>
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                    </div>
                </ScrollTriggeredSection>
            </div>
        </div>
    )
}