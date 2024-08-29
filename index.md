---
layout: org-and-person
title: {{ site.data.personal_info.name }} | {{ site.data.personal_info.job_title }} | {{ site.data.personal_info.secondary_title }} | {{ site.data.personal_info.tertiary_title }} | contacts, media
description: Contacts and related URLs to {{ site.data.personal_info.name }}. Social media profiles, instagram, Linkedin, email and phone. {{ site.data.personal_info.secondary_title }} | {{ site.data.personal_info.tertiary_title }}
lang: en
lang-ref: contacts-media
---

# {{ site.data.personal_info.name }}

{{ site.data.personal_info.job_title }}
{{ site.data.personal_info.secondary_title }}
{{ site.data.personal_info.tertiary_title }}

## Contact Information

{% for link in site.data.social_links %}
- {{ link.name }}: [{{ link.username }}]({{ link.url }})
{% endfor %}

## Professional Roles

{% for role in site.data.professional_roles %}
- [{{ role.title }}]({{ role.url }})
{% endfor %}

## Media Mentions and Articles

{% for mention in site.data.media_mentions %}
{% if mention.language == 'en' %}
### {{ mention.title }}
- Publisher: {{ mention.publisher }}
- Date: {{ mention.date }}
- [Read more]({{ mention.url }})
{% if mention.event %}
- Event: [{{ mention.event }}]({{ mention.event_url }})
{% endif %}
{% if mention.type %}
- Type: {{ mention.type }}
{% endif %}

{% endif %}
{% endfor %}

## Other Profiles and URLs

{% for url in site.data.other_urls %}
- {{ url.name }}: [{{ url.username }}]({{ url.url }})
{% endfor %}