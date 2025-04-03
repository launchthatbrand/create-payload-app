#!/bin/bash

# Script to generate Storybook stories for all Payload UI components

# Create the output directory if it doesn't exist
mkdir -p src/stories

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Generating stories for all @payloadcms/ui components...${NC}"

# Get a list of all components
COMPONENTS=$(find node_modules/@payloadcms/ui/dist/elements -type d -maxdepth 1 | sort | grep -v "^node_modules/@payloadcms/ui/dist/elements$")

# Total component count for progress tracking
TOTAL=$(echo "$COMPONENTS" | wc -l | tr -d '[:space:]')
COUNT=0
SUCCESS=0
FAILED=0
FAILED_COMPONENTS=()

for COMPONENT in $COMPONENTS; do
  COUNT=$((COUNT + 1))
  COMPONENT_NAME=$(basename "$COMPONENT")
  
  echo -e "\n${YELLOW}[$COUNT/$TOTAL] Processing ${COMPONENT_NAME}...${NC}"
  
  # Run the generate-stories script on this component
  if node scripts/generate-stories.cjs "@payloadcms/ui/dist/elements/$COMPONENT_NAME" --verbose; then
    echo -e "${GREEN}✅ Successfully generated story for $COMPONENT_NAME${NC}"
    SUCCESS=$((SUCCESS + 1))
  else
    echo -e "${RED}❌ Failed to generate story for $COMPONENT_NAME${NC}"
    FAILED=$((FAILED + 1))
    FAILED_COMPONENTS+=("$COMPONENT_NAME")
  fi
done

echo -e "\n${BLUE}📊 Story Generation Summary:${NC}"
echo -e "${BLUE}==========================${NC}"
echo -e "${GREEN}✅ Successfully generated: $SUCCESS/$TOTAL${NC}"

if [ $FAILED -gt 0 ]; then
  echo -e "\n${RED}❌ Failed components: $FAILED${NC}"
  for COMPONENT in "${FAILED_COMPONENTS[@]}"; do
    echo -e "${RED}   - $COMPONENT${NC}"
  done
fi

# Try to run the JavaScript script to update the index file
echo -e "\n${YELLOW}Updating index.stories.mdx...${NC}"
if node scripts/generate-all-stories.js; then
  echo -e "${GREEN}✅ Updated index.stories.mdx${NC}"
else
  echo -e "${RED}❌ Failed to update index.stories.mdx, but stories were generated.${NC}"
fi

echo -e "\n${GREEN}✨ Story generation complete! Stories are available in src/stories/${NC}" 