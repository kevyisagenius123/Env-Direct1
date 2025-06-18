import React, { useState, useEffect } from 'react';
import DataVisualization from './DataVisualization';

/**
 * Article Metrics Visualization Component
 * 
 * This component displays visualizations of article metrics such as:
 * - Distribution of articles by category
 * - Distribution of articles by tag
 * - Articles published over time
 * - Most viewed articles
 * 
 * @param {Object} props - Component props
 * @param {Array} props.articles - Array of articles to visualize
 * @param {Array} props.categories - Array of all categories
 * @param {Array} props.tags - Array of all tags
 */
const ArticleMetricsVisualization = ({ articles = [], categories = [], tags = [] }) => {
  const [categoryChartData, setCategoryChartData] = useState(null);
  const [tagChartData, setTagChartData] = useState(null);
  const [timelineChartData, setTimelineChartData] = useState(null);

  useEffect(() => {
    if (articles.length > 0) {
      // Prepare data for category distribution chart
      prepareCategoryChartData();

      // Prepare data for tag distribution chart
      prepareTagChartData();

      // Prepare data for timeline chart
      prepareTimelineChartData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, categories, tags, 
      // We're disabling the exhaustive-deps rule because these functions
      // are defined inside the component and depend on the props
      // Adding them to the dependency array would cause infinite re-renders
  ]);

  const prepareCategoryChartData = () => {
    // Count articles by category
    const categoryCounts = {};
    categories.forEach(category => {
      categoryCounts[category.name] = 0;
    });

    // Count articles in each category
    articles.forEach(article => {
      article.categories.forEach(category => {
        if (categoryCounts[category.name] !== undefined) {
          categoryCounts[category.name]++;
        }
      });
    });

    // Prepare chart data
    const data = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: 'Articles by Category',
          data: Object.values(categoryCounts),
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(201, 203, 207, 0.5)'
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 206, 86)',
            'rgb(153, 102, 255)',
            'rgb(54, 162, 235)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }
      ]
    };

    setCategoryChartData(data);
  };

  const prepareTagChartData = () => {
    // Count articles by tag (limit to top 10 tags)
    const tagCounts = {};
    tags.forEach(tag => {
      tagCounts[tag.name] = 0;
    });

    // Count articles with each tag
    articles.forEach(article => {
      article.tags.forEach(tag => {
        if (tagCounts[tag.name] !== undefined) {
          tagCounts[tag.name]++;
        }
      });
    });

    // Sort tags by count and take top 10
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Prepare chart data
    const data = {
      labels: sortedTags.map(tag => tag[0]),
      datasets: [
        {
          label: 'Articles by Tag (Top 10)',
          data: sortedTags.map(tag => tag[1]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }
      ]
    };

    setTagChartData(data);
  };

  const prepareTimelineChartData = () => {
    // Group articles by month
    const monthCounts = {};
    const now = new Date();

    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthCounts[monthKey] = 0;
    }

    // Count articles published in each month
    articles.forEach(article => {
      if (article.createdAt) {
        const date = new Date(article.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (monthCounts[monthKey] !== undefined) {
          monthCounts[monthKey]++;
        }
      }
    });

    // Format month labels
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedLabels = Object.keys(monthCounts).map(key => {
      const [year, month] = key.split('-');
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    });

    // Prepare chart data
    const data = {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Articles Published',
          data: Object.values(monthCounts),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
          fill: true
        }
      ]
    };

    setTimelineChartData(data);
  };

  if (!articles.length) {
    return null;
  }

  return (
    <div className="article-metrics-visualization bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Article Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryChartData && (
          <div>
            <DataVisualization
              type="pie"
              data={categoryChartData}
              title="Articles by Category"
              description="Distribution of articles across different categories"
            />
          </div>
        )}

        {tagChartData && (
          <div>
            <DataVisualization
              type="bar"
              data={tagChartData}
              title="Top Tags"
              description="Most used tags across all articles"
            />
          </div>
        )}

        {timelineChartData && (
          <div className="md:col-span-2">
            <DataVisualization
              type="area"
              data={timelineChartData}
              title="Publishing Timeline"
              description="Number of articles published over time"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleMetricsVisualization;
