from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent
expected_order = [
    'void_background',
    'access_gate',
    'floating_relics',
    'hero',
    'manifest',
    'relic_grid',
    'signal_interstitial',
    'next_drop',
    'exit_nav',
]

template_path = root / 'templates/page.floating-archive.json'
template = json.loads(template_path.read_text())
assert template['order'] == expected_order, f"Unexpected section order: {template['order']}"

section_texts = []
for key in expected_order:
    section_type = template['sections'][key]['type']
    section_path = root / 'sections' / f'{section_type}.liquid'
    assert section_path.exists(), f'Missing section: {section_path}'
    text = section_path.read_text()
    section_texts.append(text)
    assert '{% schema %}' in text and '{% endschema %}' in text, f'Missing schema tags: {section_path}'
    schema = text.split('{% schema %}', 1)[1].split('{% endschema %}', 1)[0].strip()
    json.loads(schema)

# Check every floating archive section schema, including fallback main, remains valid.
for section_path in sorted((root / 'sections').glob('floating-archive-*.liquid')):
    text = section_path.read_text()
    if '{% schema %}' in text:
        schema = text.split('{% schema %}', 1)[1].split('{% endschema %}', 1)[0].strip()
        json.loads(schema)

all_text = '\n'.join(
    [template_path.read_text()]
    + [p.read_text() for p in sorted((root / 'sections').glob('floating-archive-*.liquid'))]
    + [(root / 'assets/floatin-archive-page.css').read_text(), (root / 'assets/floatin-archive-page.js').read_text()]
)

required_copy = [
    "FLOATIN' ARCHIVE",
    'Back porch of the universe.',
    'Now playing: Side B',
    'Where am I?',
    'In rotation',
    'Twelve pieces. Pulled from the static. Limited runs.',
    'Next drop incoming',
    'Leave your frequency. Get the heads up before Side A.',
    'Back to the main floor',
    'floatin-archive',
]
missing = [item for item in required_copy if item not in all_text]
assert not missing, f'Missing locked/default copy: {missing}'

banned_patterns = [
    r'RESTRICTED ACCESS',
    r'DECRYPT',
    r'forbidden',
    r'\bvault\b',
    r'\bprotected\b',
    r'Signal Seeker Access',
]
violations = [pattern for pattern in banned_patterns if re.search(pattern, all_text, re.IGNORECASE)]
assert not violations, f'Banned copy patterns found: {violations}'

required_assets = [
    'assets/floatin-archive-page.css',
    'assets/floatin-archive-page.js',
    'assets/floatin-archive-logo.jpeg',
    'assets/floatin-archive-hero.png',
    'assets/floatin-archive-next-drop-bg.png',
]
for rel in required_assets:
    p = root / rel
    assert p.exists() and p.stat().st_size > 0, f'Missing/empty asset: {rel}'

relic_grid = (root / 'sections/floating-archive-relic-grid.liquid').read_text()
assert "collections[collection_handle]" in relic_grid, 'Relic grid must use dynamic collection handle.'
assert "form 'product'" in relic_grid, 'Relic grid must support Shopify product add form.'
assert "limit: 12" in relic_grid, 'Relic grid must limit the rotation to 12 products.'

email_section = (root / 'sections/floating-archive-secondary-drift.liquid').read_text()
assert "form 'customer'" in email_section, 'Next drop section must use Shopify customer form.'
assert "next-drop-frequency" in email_section, 'Customer form must tag next-drop-frequency.'

print('QA PASS: Floatin Archive Shopify port validates section order, schemas, required copy, banned-copy exclusions, assets, dynamic product grid, and customer form wiring.')
