/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import EventCard from "@/components/event-card";
import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    toolSchema: z
      .function()
      .args(z.string().describe("The continent to filter countries by"))
      .returns(
        z
          .object({
            continent: z.string().optional(),
            sortBy: z.enum(["population", "growthRate"]).optional(),
            limit: z.number().optional(),
            order: z.enum(["asc", "desc"]).optional(),
          })
          .optional(),
      ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    toolSchema: z
      .function()
      .args(z.string().describe("The continent to filter countries by"))
      .returns(
        z
          .object({
            startYear: z.number().optional(),
            endYear: z.number().optional(),
          })
          .optional(),
      ),
  },
  // Add more tools here
  {
  name: "get-upcoming-events",
  description: "Get a list of upcoming events with date, location, and register links.",
  tool: () => [
    { title: "Custom Hack 2.0", date: "2025-08-20", location: "Downtown Square", registerUrl: "https://example.com/register-jazz" },
    { title: "Tech Meetup", date: "2025-08-25", location: "Innovation Hub", registerUrl: "https://example.com/register-tech" },
    { title: "Tambo Tuesday", date: "2025-08-27", location: "Central Park", registerUrl: "https://example.com/register-market"},
  ],
  toolSchema: z.function().returns(
    z.array(
      z.object({
        title: z.string(),
        date: z.string(),
        location: z.string(),
        registerUrl: z.string(),
      })
    )
  ),
  },


];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  // Add more components here
  {
  name: "EventCard",
  description: "Displays a list of upcoming events with dates, locations, and a register button.",
  component: EventCard,
  propsSchema: z.object({
    events: z.array(
      z.object({
        title: z.string().describe("The name of the event"),
        date: z.string().describe("The date of the event in ISO format"),
        location: z.string().describe("The location of the event"),
        registerUrl: z.string().describe("A link to register for the event"),
      })
    ),
  }),
},


];
