/**
 * Typography Showcase Component
 * 
 * A component to test and showcase the typography system
 * with Winner Sans and Roboto fonts.
 */

import React from 'react'
import { 
  H1, H2, H3, H4, H5, H6,
  DisplayHero, DisplaySubtitle,
  BodyLarge, BodyRegular, BodySmall, BodyXS,
  ButtonText, LinkText, NavText,
  Caption, Label, Code
} from './typography'

export function TypographyShowcase() {
  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <H2>Typography Showcase</H2>
        <BodyRegular>
          This showcase demonstrates the typography system using Winner Sans for headlines 
          and Roboto for body text.
        </BodyRegular>
      </div>

      {/* Headlines */}
      <section className="space-y-4">
        <H3>Headlines (Winner Sans)</H3>
        <div className="space-y-2">
          <DisplayHero>Display Hero Text</DisplayHero>
          <H1>Heading 1 - Main Page Title</H1>
          <H2>Heading 2 - Section Title</H2>
          <H3>Heading 3 - Subsection Title</H3>
          <H4>Heading 4 - Component Title</H4>
          <H5>Heading 5 - Small Title</H5>
          <H6>Heading 6 - Smallest Title</H6>
        </div>
      </section>

      {/* Display Text */}
      <section className="space-y-4">
        <H3>Display Text</H3>
        <div className="space-y-2">
          <DisplayHero>Hero Display Text</DisplayHero>
          <DisplaySubtitle>
            This is a subtitle that provides additional context to the hero text above.
          </DisplaySubtitle>
        </div>
      </section>

      {/* Body Text */}
      <section className="space-y-4">
        <H3>Body Text (Roboto)</H3>
        <div className="space-y-4">
          <BodyLarge>
            Large body text is perfect for important descriptions and introductory paragraphs 
            that need to stand out while remaining highly readable.
          </BodyLarge>
          <BodyRegular>
            Regular body text is the standard for most content. It provides excellent readability 
            and is comfortable for extended reading sessions.
          </BodyRegular>
          <BodySmall>
            Small body text is useful for secondary information, captions, and supporting details 
            that don&apos;t need as much visual prominence.
          </BodySmall>
          <BodyXS>
            Extra small text is perfect for fine print, metadata, and minimal supporting information.
          </BodyXS>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-4">
        <H3>Interactive Elements</H3>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <ButtonText>Button Text</ButtonText>
            <LinkText>Link Text</LinkText>
            <NavText>Navigation Text</NavText>
          </div>
        </div>
      </section>

      {/* Utility Text */}
      <section className="space-y-4">
        <H3>Utility Text</H3>
        <div className="space-y-2">
          <Caption>This is caption text for images and supporting information</Caption>
          <Label>Form Label Text</Label>
          <Code>const example = &quot;code text&quot;;</Code>
        </div>
      </section>

      {/* Font Family Examples */}
      <section className="space-y-4">
        <H3>Font Family Examples</H3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="font-primary text-lg font-semibold mb-2">Winner Sans (Primary)</div>
            <div className="font-primary">
              This text uses the Winner Sans font family for headlines and important text.
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-secondary text-lg font-semibold mb-2">Roboto (Secondary)</div>
            <div className="font-secondary">
              This text uses the Roboto font family for body text and general content.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}