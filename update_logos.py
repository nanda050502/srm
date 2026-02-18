import json
import csv

# Read CSV and create mapping
logo_map = {}
with open('logo.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        company_id = int(row['company_id'])
        logo_url = row['logo_url'].strip() if row['logo_url'] else None
        logo_map[company_id] = logo_url

# Update company_full.json
print('Updating company_full.json...')
with open('src/data/company_full.json', 'r', encoding='utf-8') as f:
    companies_full = json.load(f)

updated_count = 0
skipped_count = 0
for company in companies_full:
    company_id = company.get('company_id')
    if company_id in logo_map:
        old_logo = company.get('logo_url', 'N/A')
        new_logo = logo_map[company_id]
        if new_logo and new_logo != old_logo:
            company['logo_url'] = new_logo
            updated_count += 1
            print(f'  ID {company_id}: Updated')
        elif not new_logo:
            skipped_count += 1
            print(f'  ID {company_id}: SKIPPED (empty in CSV)')

with open('src/data/company_full.json', 'w', encoding='utf-8') as f:
    json.dump(companies_full, f, indent=4, ensure_ascii=False)

print(f'✓ Updated {updated_count} entries in company_full.json')
print(f'✓ Skipped {skipped_count} entries with empty logo_url')

# Update company_short.json
print('\nUpdating company_short.json...')
with open('src/data/company_short.json', 'r', encoding='utf-8') as f:
    companies_short = json.load(f)

updated_count = 0
for company in companies_short:
    company_id = company.get('company_id')
    if company_id in logo_map:
        old_logo = company.get('logo_url', 'N/A')
        new_logo = logo_map[company_id]
        if new_logo and new_logo != old_logo:
            company['logo_url'] = new_logo
            updated_count += 1
            print(f'  ID {company_id}: Updated')

with open('src/data/company_short.json', 'w', encoding='utf-8') as f:
    json.dump(companies_short, f, indent=4, ensure_ascii=False)

print(f'✓ Updated {updated_count} entries in company_short.json')

print('\n=== Update Summary ===')
print(f'Total entries in CSV: {len(logo_map)}')
empty_count = len([v for v in logo_map.values() if not v])
print(f'Entries with valid logo URLs: {len(logo_map) - empty_count}')
print(f'Entries with empty logo URLs: {empty_count}')
print('Update complete!')
