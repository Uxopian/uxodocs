---
title: "Statistics & ROI"
sidebar_position: 4
---
# Global Statistics

The **Statistics** page provides a high-level overview of your system's health, usage trends, and Return on Investment (ROI).

## Time Interval Selector

All time-based views support a configurable **time interval**. Use the interval selector to adjust the granularity of the data:

| Interval | Description |
| :------- | :---------- |
| `HOUR`   | Hourly breakdown (useful for monitoring recent activity). |
| `DAY`    | Daily aggregation (default). |
| `WEEK`   | Weekly summary. |
| `MONTH`  | Monthly overview. |
| `YEAR`   | Yearly totals. |

The selected interval applies to the Usage Trends view and is passed as the `interval` query parameter when calling the statistics API.

## Global Metrics

Real-time counters provide an instant view of the organization's total consumption:

- **Total Requests:** The aggregate number of interactions processed.
- **Total Conversations:** The count of unique conversation threads.
- **Total Tokens:** The sum of all Input and Output tokens consumed.
- **Total Time Saved:** The cumulative estimated hours saved, calculated based on the ROI settings of utilized prompts.

**API:** `GET /api/v1/admin/stats/global`

## Usage Trends

Time-series charts displaying activity over the selected time interval:

- **Request Volume:** Number of requests over time.
- **Token Consumption:** Input and output tokens over time.

**API:** `GET /api/v1/admin/stats/timeseries?interval=DAY`

## LLM Distribution

A breakdown of which AI models and providers are being utilized the most. Helps identify model concentration and optimize costs.

**API:** `GET /api/v1/admin/stats/llm-distribution`

## Top Prompts by Time Saved

A ranking of the most valuable prompts in terms of estimated productivity gains. Each prompt's `timeSaved` value (set during prompt creation) is multiplied by its usage count to calculate the total ROI.

**API:** `GET /api/v1/admin/stats/top-prompts-time-saved`

## Feature Adoption

Visualizes the usage rate of advanced capabilities:

- **Multi-Modal:** Percentage of requests that include image inputs.
- **Function Calling:** Percentage of requests that trigger external tools.

**API:** `GET /api/v1/admin/stats/feature-adoption`
