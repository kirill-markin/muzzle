---
layout: org-and-person
title: {{ site.data.personal_info.name }} | {{ site.data.personal_info.job_title }} | contacts, media
description: Contacts and related URLs to {{ site.data.personal_info.name }}. Social media profiles, instagram, Linkedin, email and phone.
lang: ru
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
- title: {{ role.title }}: [{{ role.title }}]({{ role.url }})
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

{% for mention in site.data.media_mentions %}
{% if mention.language == 'ru' %}
### {{ mention.title }}
- Издатель: {{ mention.publisher }}
- Дата: {{ mention.date }}
- [Читать далее]({{ mention.url }})
{% if mention.event %}
- Мероприятие: [{{ mention.event }}]({{ mention.event_url }})
{% endif %}
{% if mention.type %}
- Тип: {{ mention.type }}
{% endif %}


{% endif %}
{% endfor %}

## Other Profiles and URLs

{% for url in site.data.other_urls %}
- {{ url.name }}: [{{ url.username }}]({{ url.url }})
{% endfor %}
